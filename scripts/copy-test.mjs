import fs from 'fs';
import path from 'path';

/**
 * Copies dist/index.html to dist/test/index.html and dist/test.html
 * to guarantee that /test resolves with status 200 on any static CDN or host.
 */
try {
  const distDir = path.resolve('dist');
  const indexFile = path.join(distDir, 'index.html');
  const testDir = path.join(distDir, 'test');
  const testIndex = path.join(testDir, 'index.html');
  const testHtml = path.join(distDir, 'test.html');

  if (fs.existsSync(indexFile)) {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
    fs.copyFileSync(indexFile, testIndex);
    fs.copyFileSync(indexFile, testHtml);
    console.log('[postbuild] Created dist/test/index.html and dist/test.html successfully.');
  }
} catch (err) {
  console.error('[postbuild] Failed to generate static test route:', err);
}
