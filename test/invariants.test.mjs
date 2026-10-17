import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { THEME } from '../src/config/theme.ts';
import { STRINGS } from '../src/constants/strings.ts';

test('Theme Invariant: All color tokens are centralized', () => {
  assert.equal(THEME.colors.void.pure, '#000000');
  assert.equal(THEME.colors.blue.cobalt, '#0044FF');
  assert.equal(THEME.colors.blue.laserCyan, '#00E5FF');
  assert.ok(THEME.glows.laserIntense.includes('#00E5FF') || THEME.glows.laserIntense.includes('rgba'));
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
