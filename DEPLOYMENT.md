# LØST SØULS — Production Deployment Guide

A step-by-step walkthrough for deploying the Lost Souls experience to **Vercel** with a custom **Spaceship domain**, **PostgreSQL database (Prisma)**, and **Resend email transmission**.

---

## Architecture Overview

```
                      ┌────────────────────────────────────────┐
                      │            SPACESHIP DOMAIN            │
                      │         (DNS Records / SSL)            │
                      └──────────────────┬─────────────────────┘
                                         │
                                         ▼
                      ┌────────────────────────────────────────┐
                      │             VERCEL HOSTING             │
                      │  • Vite Static SPA Build               │
                      │  • Serverless Function: /api/waitlist  │
                      └──────────────┬──────────────────┬──────┘
                                     │                  │
                Prisma Client Writes │                  │ Resend REST API
                                     ▼                  ▼
              ┌────────────────────────────┐      ┌───────────────────────────┐
              │    POSTGRESQL DATABASE     │      │        RESEND API         │
              │  (Supabase / Neon / AWS)   │      │  • Dark HTML confirmation │
              │  • WaitlistSubscriber      │      │  • Admin alert dispatch   │
              │  • NewsletterSubscriber    │      └───────────────────────────┘
              └────────────────────────────┘
```

---

## 1. Database Setup (PostgreSQL & Prisma)

Lost Souls uses **Prisma** to persist waitlist transmissions.

### Option A: Using Supabase (Recommended)
1. Log in to [Supabase](https://supabase.com/).
2. If using an existing project (like your previous one), check if it is **Paused**. Click **Restore / Unpause Project** if prompted.
3. If creating a new project:
   - Click **New Project** → Select a region close to Europe (e.g. `EU (Frankfurt) eu-central-1`).
   - Choose a secure database password.
4. Obtain your connection string:
   - Go to **Project Settings** → **Database**.
   - Under **Connection string**, select **URI** and choose **Transaction Pooler** (port `6543`) or **Session Pooler** (port `5432`).
   - Replace `[YOUR-PASSWORD]` with your database password.
   - Example:
     ```
     postgresql://postgres.yourprojectref:[PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true
     ```

### Option B: Using Neon (Serverless Postgres)
1. Go to [Neon.tech](https://neon.tech/) and create a free project.
2. Copy the pooled connection string (`postgresql://...`).

### Synchronize Database Schema
From your local terminal inside `LostSouls-Events`:
1. Make sure your [.env](file:///c:/Users/joeyw/GitProjects/LostSouls-Events/.env) has your active `DATABASE_URL`.
2. Push the schema to create the `WaitlistSubscriber` and `NewsletterSubscriber` tables:
   ```bash
   npx prisma db push
   ```
3. To inspect your stored emails visually, run:
   ```bash
   npx prisma studio
   ```
   (Or inspect via the Supabase Table Editor).

---

## 2. Resend Email Setup

Lost Souls sends an underground techno-styled confirmation email to every subscriber and an alert to the administrator.

### Step 1: Create an API Key
1. Go to [Resend.com](https://resend.com/) and sign in.
2. Navigate to **API Keys** → Click **Create API Key**.
3. Name: `LostSouls Production`.
4. Permissions: `Full Access`.
5. Copy the key (starts with `re_...`).

### Step 2: Add & Verify Your Domain on Resend
To send emails to any subscriber from your own address (e.g., `tickets@yourdomain.com` or `joey@yourdomain.com`):
1. In Resend, go to **Domains** → Click **Add Domain**.
2. Enter your root domain or subdomain (e.g. `yourdomain.com`).
3. Resend will provide 3 DNS records:
   - **DKIM** (TXT record)
   - **SPF** (TXT or MX record)
   - **Feedback / Tracking** (MX / CNAME record)
4. Keep this page open while you configure Spaceship DNS in the next section.

> [!NOTE]
> **Free Sandbox Testing**: If your domain is not verified yet, Resend allows sending test emails using `onboarding@resend.dev`, but only to your registered Resend account email (`joeywognum@gmail.com`). Once verified, you can send to any recipient.

---

## 3. Spaceship Domain Setup

Configure your domain on [Spaceship.com](https://www.spaceship.com/) to route web traffic to Vercel and email validation to Resend.

### Step 1: Link Domain to Vercel
1. Log in to [Spaceship](https://www.spaceship.com/).
2. Go to **Launchpad** → **Domain List** → Select your domain.
3. Click **Advanced DNS** (or **DNS Management**).
4. Add the following records for Vercel:
   | Type | Host / Name | Value | TTL |
   | :--- | :--- | :--- | :--- |
   | **A** | `@` | `76.76.21.21` | Automatic / 300 |
   | **CNAME** | `www` | `cname.vercel-dns.com` | Automatic / 300 |

### Step 2: Add Resend Verification Records to Spaceship
In the same **Advanced DNS** screen on Spaceship, add the DNS records provided by Resend:
| Type | Host / Name | Value |
| :--- | :--- | :--- |
| **TXT** | `resend._domainkey` | *Copy value from Resend dashboard* |
| **TXT** | `_dmarc` (or `@`) | `v=spf1 include:amazonses.com ~all` (or Resend's value) |
| **MX** | `send` (or as provided) | *Copy value from Resend dashboard* |

After adding these, return to Resend and click **Verify Domain**. Status will update to **Verified** once propagated (usually 2–15 minutes).

---

## 4. Vercel Project & Environment Configuration

You already linked the Git repository to Vercel. Now add the production environment variables and verify build settings.

### Step 1: Add Environment Variables in Vercel
1. Go to your project on the [Vercel Dashboard](https://vercel.com/).
2. Navigate to **Settings** → **Environment Variables**.
3. Add the following variables (check **Production**, **Preview**, and **Development**):

| Key | Example Value | Description |
| :--- | :--- | :--- |
| `DATABASE_URL` | `postgresql://postgres:...@...pooler.supabase.com:6543/postgres?pgbouncer=true` | Your active PostgreSQL database connection string |
| `RESEND_API_KEY` | `re_4uDNbVAj_KWrRPix...` | Resend API key |
| `RESEND_FROM_EMAIL` | `Lost Souls <joey@joeyvanderpoel.com>` (or your verified domain) | Sender name and address |
| `ADMIN_NOTIFICATION_EMAIL` | `joeywognum@gmail.com` | Address receiving new subscriber alerts |

### Step 2: Verify Build Command
1. In Vercel, navigate to **Settings** → **General** → **Build & Development Settings**.
2. Build Command: `npm run build`
   *(In `package.json`, this is configured as `prisma generate && tsc && vite build`, guaranteeing Prisma Client is generated before TypeScript compiling).*
3. Output Directory: `dist`
4. Framework Preset: `Vite`

### Step 3: Add Custom Domain in Vercel
1. Navigate to **Settings** → **Domains**.
2. Enter your Spaceship domain (e.g. `yourdomain.com`).
3. Vercel will recommend adding both `yourdomain.com` and `www.yourdomain.com` (with redirect).
4. Vercel will automatically check the Spaceship DNS A and CNAME records and issue a free SSL certificate.

---

## 5. Deployment Execution

To trigger your deployment:

1. Stage and commit your changes:
   ```bash
   git add .
   git commit -m "feat: mysterious dark teaser with subtle waitlist, prisma persistence, and resend mailing"
   git push origin main
   ```
2. Vercel will automatically pick up the commit, run `prisma generate`, compile the TypeScript bundle, deploy the `/api/waitlist` serverless function, and assign your domain.

---

## 6. Production Verification Checklist

Once Vercel reports **Ready**:

- [ ] **Visit Live URL**: Open your Spaceship domain in your browser.
- [ ] **Visual Verification**: Confirm the pitch-black void, centered `LØST SØULS`, `SOMETHING BIG IS COMING...`, and clean floating `join the waiting list` prompt.
- [ ] **Interaction Test**:
  1. Click `join the waiting list` and type an email.
  2. Confirm the laser cyan targeting reticle icon emerges on the right with a subtle hairline underline.
  3. Click the reticle icon.
  4. Confirm the text smoothly transitions to `check your email`.
- [ ] **Database Verification**:
  - Open Supabase / Neon / Prisma Studio.
  - Check the `WaitlistSubscriber` table and confirm the email and timestamp were logged.
- [ ] **Email Receipt**:
  - Check the recipient inbox for the dark-mode Lost Souls confirmation email.
  - Check `joeywognum@gmail.com` for the admin notification alert.
