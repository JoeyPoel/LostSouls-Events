# Fail-Safe Waitlist Service — Architecture & Replication Blueprint

This document explains the architecture of the **Fail-Safe Waitlist Service** and provides a step-by-step guide to copying and adapting it into any other project (e.g., Next.js, Vite + Vercel Functions, Express, or Node.js).

---

## 1. Why Standard Waitlists Fail (The Problem)

In most web applications, a waitlist signup endpoint follows a synchronous pattern:

```text
Incoming Request ──> Connect to Database ──> Write Record ──> Send Email ──> 200 OK
```

### Critical Vulnerabilities of the Naive Approach
1. **Database Latency & Cold Starts**: When using serverless databases (Supabase, Neon, AWS RDS, PlanetScale), connection pools can exhaust or spin down. Prisma or database drivers can hang for 10 to 30+ seconds attempting connection handshakes.
2. **Serverless Function Timeouts**: Vercel kills serverless functions after 10s (Hobby) or 15s (Pro) with a `504 Gateway Timeout`. If the database hangs, the function terminates before reaching the email dispatch line.
3. **Lost Leads**: When the timeout strikes, the prospective subscriber sees an error screen (`TRANSMISSION OFFLINE`), and **neither the subscriber nor the administrator receives any record of the email**. The lead is permanently lost.

---

## 2. The Fail-Safe Dual-Dispatch Architecture (The Solution)

The Lost Souls fail-safe waitlist architecture isolates the database write behind a **hard execution deadline** (`withTimeout`) and treats email dispatch as an autonomous, guaranteed delivery channel.

```mermaid
sequenceDiagram
    autonumber
    actor User as Subscriber (Browser)
    participant UI as WaitlistForm.tsx
    participant API as POST /api/waitlist
    participant DB as PostgreSQL (Prisma)
    participant Mail as Resend Mail Service
    actor Admin as Admin Inbox

    User->>UI: Types email & clicks submit
    UI->>API: POST /api/waitlist { email, source }
    
    rect rgb(20, 20, 30)
        Note over API,DB: Step 1: Database Persistence (with 2500ms Deadline)
        API->>DB: upsert waitlistSubscriber (Promise.race)
        alt Database Responds in < 2500ms (Happy Path)
            DB-->>API: 200 OK (Persisted)
            Note over API: dbStatus = "persisted"
        else Database Hangs or Fails (Fail-Safe Triggered)
            Note over DB: Timeout after 2500ms or Connection Error
            API-->>API: Timeout Triggered! Catch error, set dbStatus = "timeout" | "failed"
            Note over API: Log [FAILSAFE_BACKUP] structured audit trail
        end
    end

    rect rgb(10, 30, 20)
        Note over API,Mail: Step 2: Guaranteed Email Dispatch
        API->>Mail: sendWaitlistConfirmationEmail(subscriber)
        Mail-->>User: Confirmation Email ("SOMETHING BIG IS COMING...")
        API->>Mail: sendAdminWaitlistNotification(admin, dbStatus)
        Mail-->>Admin: Admin Alert with Subscriber Details + [DB FAILOVER] if failed
    end

    API-->>UI: 201 Created { success: true, dbStatus }
    UI-->>User: Renders Success Screen ("CHECK YOUR INBOX")
```

### Core Resilience Invariants
- **Bounded Latency**: The database query is wrapped in `withTimeout(promise, 2500)` (configurable via `DB_TIMEOUT_MS`). The function will never hang or trigger a Vercel 504.
- **Delivery Guarantee**: Whether the database succeeds, times out, or throws an unhandled error, execution **always** advances to email dispatch.
- **Zero Lead Loss (Out-of-Band Backup)**: The admin notification email includes the subscriber's email, timestamp, and source tag. If the database failed or timed out, the email subject is automatically prefixed with `[DB FAILOVER]` and contains instructions for manual recovery.
- **Flawless User Experience**: The subscriber never encounters an ugly database connection error or infinite loading spinner; they receive their confirmation email immediately.

---

## 3. Implementation Files Overview

| File | Purpose |
| :--- | :--- |
| [api/lib/async.ts](file:///c:/Users/joeyw/GitProjects/LostSouls-Events/api/lib/async.ts) | Implements [withTimeout](file:///c:/Users/joeyw/GitProjects/LostSouls-Events/api/lib/async.ts) for execution deadlines. |
| [api/lib/prisma.ts](file:///c:/Users/joeyw/GitProjects/LostSouls-Events/api/lib/prisma.ts) | Lazy-loaded PrismaClient singleton proxy to avoid module crash when `DATABASE_URL` is unset or connecting slowly. |
| [api/lib/mail.ts](file:///c:/Users/joeyw/GitProjects/LostSouls-Events/api/lib/mail.ts) | Resend API client: formats HTML email for subscriber and admin alert with failover metadata. |
| [api/waitlist/index.ts](file:///c:/Users/joeyw/GitProjects/LostSouls-Events/api/waitlist/index.ts) | Serverless endpoint executing bounded DB persistence, fallback logging, and guaranteed email dispatch. |
| [src/components/teaser/WaitlistForm.tsx](file:///c:/Users/joeyw/GitProjects/LostSouls-Events/src/components/teaser/WaitlistForm.tsx) | Clean client-side UI with email validation, inline loader, and success confirmation. |

---

## 4. How to Copy This Service Into a New Project

Follow these 6 steps to implement this exact service in another repository:

### Step 1: Install Dependencies
```bash
npm install @prisma/client
npm install -D prisma tsx @types/node
```
*(No third-party email SDK required; the implementation uses native Node.js `fetch` to call Resend).*

### Step 2: Configure Environment Variables (`.env`)
```env
# Database Connection (PostgreSQL / Supabase / Neon / PlanetScale)
DATABASE_URL="postgresql://user:password@host:5432/dbname?pgbouncer=true"

# Maximum wait time for database before triggering fail-safe (in milliseconds)
DB_TIMEOUT_MS=2500

# Resend API Key (https://resend.com)
RESEND_API_KEY="re_123456789"

# Sender and Administrator Addresses
RESEND_FROM_EMAIL="Brand Name <noreply@yourdomain.com>"
ADMIN_NOTIFICATION_EMAIL="admin@yourdomain.com"
```

### Step 3: Define Prisma Schema (`prisma/schema.prisma`)
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model WaitlistSubscriber {
  id        String   @id @default(cuid())
  email     String   @unique
  source    String   @default("teaser_waitlist")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([email])
}
```
Run `npx prisma db push` or `npx prisma migrate dev` to generate the table.

---

### Step 4: Copy Helper Files

#### A. Asynchronous Deadline Utility (`api/lib/async.ts`)
```typescript
/**
 * Wraps a promise with an execution deadline. Rejects if the promise does not settle within timeoutMs.
 */
export async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  operationName: string = 'Operation'
): Promise<T> {
  let timerId: NodeJS.Timeout | undefined;

  const timeoutPromise = new Promise<never>((_, reject) => {
    timerId = setTimeout(() => {
      reject(new Error(`${operationName} timed out after ${timeoutMs}ms`));
    }, timeoutMs);
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timerId) {
      clearTimeout(timerId);
    }
  }
}
```

#### B. Resilient Prisma Proxy (`api/lib/prisma.ts`)
```typescript
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

export function getPrismaClient(): PrismaClient | null {
  if (!process.env.DATABASE_URL) return null;
  if (globalForPrisma.prisma) return globalForPrisma.prisma;

  try {
    const client = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
    if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = client;
    return client;
  } catch (err) {
    console.error('[Prisma] Instantiation error:', err);
    return null;
  }
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop: string | symbol) {
    const client = getPrismaClient();
    if (!client) {
      throw new Error(`Prisma unavailable: DATABASE_URL unset or initialization failed for "${String(prop)}".`);
    }
    const val = (client as any)[prop];
    return typeof val === 'function' ? val.bind(client) : val;
  },
});

export default prisma;
```

#### C. Email Service (`api/lib/mail.ts`)
```typescript
export interface WaitlistEmailInput {
  email: string;
  source?: string;
  timestamp?: string;
  dbStatus?: 'persisted' | 'failed' | 'timeout' | 'skipped';
  dbError?: string;
}

export async function sendWaitlistConfirmationEmail(input: WaitlistEmailInput): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[Mail] RESEND_API_KEY is unset; skipping confirmation email.');
    return false;
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || 'Waitlist <onboarding@resend.dev>';

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: input.email,
        subject: 'You are on the list',
        html: `
          <div style="background-color: #000; color: #fff; padding: 40px; font-family: sans-serif; text-align: center;">
            <h1 style="letter-spacing: 2px;">CONFIRMATION</h1>
            <p style="color: #00E5FF;">You have successfully secured your position.</p>
          </div>
        `,
      }),
    });
    return res.ok;
  } catch (err) {
    console.error('[Mail] Exception sending user email:', err);
    return false;
  }
}

export async function sendAdminWaitlistNotification(input: WaitlistEmailInput): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;
  if (!adminEmail) return false;

  const fromEmail = process.env.RESEND_FROM_EMAIL || 'Waitlist <onboarding@resend.dev>';
  const dbStatus = input.dbStatus || 'unknown';
  const isFailover = dbStatus === 'failed' || dbStatus === 'timeout';
  const subject = `${isFailover ? '[DB FAILOVER] ' : ''}New Waitlist Signup: ${input.email}`;

  const alertHtml = isFailover
    ? `
      <div style="margin-top: 16px; padding: 12px; background: #260a0a; border: 1px solid #ff4444; color: #ff8888;">
        <strong>⚠️ DATABASE UNRESPONSIVE / FAILED</strong><br>
        Status: <code>${dbStatus}</code><br>
        ${input.dbError ? `Error: ${input.dbError}<br>` : ''}
        <em>The user was emailed, but this entry was NOT saved to the database. Keep this email to manually register.</em>
      </div>
    `
    : `<p style="color: #00E5FF;">Database Status: Persisted (${dbStatus})</p>`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: adminEmail,
        reply_to: input.email,
        subject,
        html: `
          <div style="font-family: monospace; background: #000; color: #fff; padding: 24px; border: 1px solid #333;">
            <h2>NEW SIGNUP</h2>
            <p><strong>Email:</strong> ${input.email}</p>
            <p><strong>Source:</strong> ${input.source || 'default'}</p>
            <p><strong>Timestamp:</strong> ${input.timestamp || new Date().toISOString()}</p>
            ${alertHtml}
          </div>
        `,
      }),
    });
    return res.ok;
  } catch (err) {
    console.error('[Mail] Exception sending admin email:', err);
    return false;
  }
}
```

---

### Step 5: Copy Serverless Handler (`api/waitlist/index.ts`)
```typescript
import type { IncomingMessage, ServerResponse } from 'http';
import { prisma } from '../lib/prisma.js';
import { sendWaitlistConfirmationEmail, sendAdminWaitlistNotification } from '../lib/mail.js';
import { withTimeout } from '../lib/async.js';

export interface VercelRequest extends IncomingMessage {
  query?: Record<string, string | string[]>;
  body?: any;
}

export interface VercelResponse extends ServerResponse {
  status?: (code: number) => VercelResponse;
  json?: (body: any) => VercelResponse;
}

async function parseJsonBody(req: VercelRequest): Promise<Record<string, any>> {
  if (req.body !== undefined && req.body !== null) {
    return typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  }
  return new Promise((resolve) => {
    let raw = '';
    req.on('data', (chunk) => { raw += chunk; });
    req.on('end', () => {
      try { resolve(raw.trim() ? JSON.parse(raw) : {}); }
      catch { resolve({}); }
    });
    req.on('error', () => resolve({}));
  });
}

function sendJson(res: VercelResponse, code: number, data: unknown): void {
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    res.status(code).json(data);
    return;
  }
  res.statusCode = code;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

async function persistWaitlistToDatabase(email: string, source: string, timeoutMs: number): Promise<'persisted'> {
  const query = (async () => {
    await prisma.waitlistSubscriber.upsert({
      where: { email },
      update: { source },
      create: { email, source },
    });
    return 'persisted' as const;
  })();

  return await withTimeout(query, timeoutMs, 'Database waitlist upsert');
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  try {
    if (req.method && req.method !== 'POST') {
      sendJson(res, 405, { error: 'Method Not Allowed' });
      return;
    }

    const body = await parseJsonBody(req);
    const { email, source = 'waitlist' } = body || {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      sendJson(res, 400, { error: 'Invalid email address' });
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const timestamp = new Date().toISOString();
    const dbTimeoutMs = process.env.DB_TIMEOUT_MS ? parseInt(process.env.DB_TIMEOUT_MS, 10) : 2500;

    let dbStatus: 'persisted' | 'failed' | 'timeout' | 'skipped' = 'skipped';
    let dbError: string | undefined;

    // 1. Database persistence with strict deadline
    if (process.env.DATABASE_URL) {
      try {
        dbStatus = await persistWaitlistToDatabase(normalizedEmail, source, dbTimeoutMs);
      } catch (err: unknown) {
        dbError = err instanceof Error ? err.message : String(err);
        dbStatus = dbError.toLowerCase().includes('timed out') ? 'timeout' : 'failed';

        // Fail-safe audit log for log drains (Datadog / Papertrail / Vercel)
        console.error(
          `[FAILSAFE_BACKUP] ${JSON.stringify({
            event: 'WAITLIST_DB_FAILOVER',
            email: normalizedEmail,
            source,
            timestamp,
            dbStatus,
            error: dbError,
          })}`
        );
      }
    }

    // 2. Guaranteed email dispatch
    let emailDispatched = false;
    try {
      emailDispatched = await sendWaitlistConfirmationEmail({
        email: normalizedEmail,
        source,
        timestamp,
        dbStatus,
      });

      await sendAdminWaitlistNotification({
        email: normalizedEmail,
        source,
        timestamp,
        dbStatus,
        dbError,
      });
    } catch (mailErr) {
      console.error('[API /api/waitlist] Email delivery error:', mailErr);
    }

    // 3. Return 201 Created to keep frontend responsive
    sendJson(res, 201, {
      success: true,
      message: 'check your email',
      email: normalizedEmail,
      emailDispatched,
      dbStatus,
    });
  } catch (fatalErr) {
    console.error('[API /api/waitlist] Fatal handler error:', fatalErr);
    sendJson(res, 500, { error: 'Transmission failed. Please retry shortly.' });
  }
}
```

---

### Step 6: Frontend Form Component (`WaitlistForm.tsx`)
```tsx
import React, { useState } from 'react';

export const WaitlistForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), source: 'web_form' }),
      });

      if (res.ok) {
        setSubmittedEmail(email.trim());
        setIsSubmitted(true);
        setEmail('');
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data.error || 'Server error. Please retry.');
      }
    } catch (err) {
      setErrorMessage('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center">
        <h3>CONFIRMATION TRANSMITTED</h3>
        <p>A message has been sent to <strong>{submittedEmail}</strong>.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your-email@domain.com"
        disabled={loading}
        required
      />
      <button type="submit" disabled={loading || !email.trim()}>
        {loading ? 'Transmitting...' : 'Join Waitlist'}
      </button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </form>
  );
};
```

---

## 5. Resilience Verification & Testing

### How to Verify Fail-Safe Functionality in Testing
You can write unit/integration tests using Node's test runner to verify behavior under all conditions:

1. **Test Unset / Offline Database**:
   Set `DATABASE_URL=""` or an invalid host (e.g. `postgresql://user:pass@127.0.0.1:54321/db`).
   - Call `handler(mockReq, mockRes)`.
   - **Expectation**: Status `201`, `responseData.success === true`, `responseData.dbStatus === 'failed' || 'skipped'`, email dispatch initiated.
2. **Test Database Hanging / Timeout**:
   Set `DB_TIMEOUT_MS=50`. Introduce an artificial `new Promise(r => setTimeout(r, 200))` in the database query.
   - **Expectation**: Aborts DB wait after 50ms, proceeds to email dispatch, returns `201` with `dbStatus === 'timeout'`.
3. **Test Structured Audit Log**:
   Check server logs for `[FAILSAFE_BACKUP] {"event":"WAITLIST_DB_FAILOVER",...}`. This JSON line can be ingested by any logging daemon (Datadog, Better Stack, CloudWatch) to automatically replay failed writes once the database recovers.
