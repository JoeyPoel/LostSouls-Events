import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { THEME } from '../src/config/theme.ts';
import { STRINGS } from '../src/constants/strings.ts';

test('Theme Invariant: All color tokens are centralized', () => {
  assert.equal(THEME.colors.void.pure, '#000000');
  assert.ok(THEME.colors.blue.cobalt.toLowerCase().startsWith('#0044ff'));
  assert.ok(THEME.colors.blue.laserCyan.startsWith('#'));
  assert.ok(THEME.glows.laserIntense.includes('#') || THEME.glows.laserIntense.includes('rgba'));
});

test('Strings Invariant: Meta and Section strings are fully populated', () => {
  assert.equal(STRINGS.meta.brandName, 'LOST SOULS');
  assert.ok(STRINGS.hero.headlineMain.length > 0);
  assert.ok(STRINGS.tickets.checkoutButton.length > 0);
  assert.equal(STRINGS.protocols.rules.length, 4);
});

test('Zero Hardcoded Hex in src/components', () => {
  const componentsDir = path.resolve('src/components');
  
  function scanDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (file === 'originkit') continue;
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        scanDir(fullPath);
      } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const lines = content.split('\n');
        lines.forEach((line, index) => {
          // Check for hex color pattern (#123, #123456, etc.)
          const hexMatch = line.match(/#[0-9a-fA-F]{3,8}\b/);
          assert.equal(
            hexMatch,
            null,
            `Hardcoded hex found in ${file}:${index + 1}: ${line}`
          );
        });
      }
    }
  }

  scanDir(componentsDir);
});

test('Prisma Resilience: Module loads safely when DATABASE_URL is unset', async () => {
  const originalDbUrl = process.env.DATABASE_URL;
  try {
    process.env.DATABASE_URL = '';
    const prismaModule = await import('../src/lib/prisma.ts');
    assert.ok(prismaModule.prisma, 'Prisma proxy should be exported');
    assert.equal(prismaModule.getPrismaClient(), null, 'getPrismaClient should return null when DATABASE_URL is unset');

    const waitlistModule = await import('../api/waitlist/index.ts');
    assert.equal(typeof waitlistModule.default, 'function', 'Waitlist handler should be a callable function');
  } finally {
    process.env.DATABASE_URL = originalDbUrl;
  }
});

test('Async Resilience: withTimeout helper enforces deadlines', async () => {
  const { withTimeout } = await import('../src/lib/async.ts');

  // Fast resolving promise
  const fastPromise = new Promise((resolve) => setTimeout(() => resolve('speed'), 20));
  const result = await withTimeout(fastPromise, 100, 'Fast task');
  assert.equal(result, 'speed');

  // Hanging promise exceeding deadline
  const slowPromise = new Promise((resolve) => setTimeout(() => resolve('late'), 150));
  await assert.rejects(
    async () => {
      await withTimeout(slowPromise, 30, 'Slow task');
    },
    (err) => {
      assert.ok(err instanceof Error);
      assert.ok(err.message.includes('timed out after 30ms'));
      return true;
    }
  );
});

test('Waitlist API Fail-Safe Invariant: Handler returns 201 success even if database fails or times out', async () => {
  const waitlistModule = await import('../api/waitlist/index.ts');
  const handler = waitlistModule.default;

  // Case 1: When database fails / is invalid
  let statusCode = 0;
  let responseData = null;

  const mockReq = {
    method: 'POST',
    body: { email: 'failover-test@lostsouls.com', source: 'unit_test' },
    on: () => {},
  };

  const createMockRes = () => ({
    statusCode: 200,
    setHeader: () => {},
    status(code) {
      statusCode = code;
      return this;
    },
    json(data) {
      responseData = data;
      return this;
    },
    end(data) {
      if (data && typeof data === 'string') {
        try {
          responseData = JSON.parse(data);
        } catch {
          responseData = data;
        }
      }
      return this;
    },
  });

  // Execute with active DATABASE_URL (which triggers DB error or timeout)
  await handler(mockReq, createMockRes());

  assert.equal(statusCode, 201, 'HTTP response should be 201 Created');
  assert.ok(responseData, 'Response data should be defined');
  assert.equal(responseData.success, true, 'Handler should return success: true');
  assert.equal(responseData.email, 'failover-test@lostsouls.com');
  assert.ok(['persisted', 'failed', 'timeout'].includes(responseData.dbStatus));

  // Case 2: When DATABASE_URL is unset
  const originalDbUrl = process.env.DATABASE_URL;
  try {
    delete process.env.DATABASE_URL;
    statusCode = 0;
    responseData = null;
    await handler(mockReq, createMockRes());

    assert.equal(statusCode, 201);
    assert.equal(responseData.success, true);
    assert.equal(responseData.dbStatus, 'skipped');
  } finally {
    process.env.DATABASE_URL = originalDbUrl;
  }
});

