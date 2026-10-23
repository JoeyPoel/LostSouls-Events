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
    // /test static route
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
    fs.copyFileSync(indexFile, testIndex);
    fs.copyFileSync(indexFile, testHtml);

    // /prod static route
    const prodDir = path.join(distDir, 'prod');
    const prodIndex = path.join(prodDir, 'index.html');
    const prodHtml = path.join(distDir, 'prod.html');
    if (!fs.existsSync(prodDir)) {
      fs.mkdirSync(prodDir, { recursive: true });
    }
    fs.copyFileSync(indexFile, prodIndex);
    fs.copyFileSync(indexFile, prodHtml);

    // /teaser static route
    const teaserDir = path.join(distDir, 'teaser');
    const teaserIndex = path.join(teaserDir, 'index.html');
    const teaserHtml = path.join(distDir, 'teaser.html');
    if (!fs.existsSync(teaserDir)) {
      fs.mkdirSync(teaserDir, { recursive: true });
    }
    fs.copyFileSync(indexFile, teaserIndex);
    fs.copyFileSync(indexFile, teaserHtml);

    console.log('[postbuild] Created dist/test, dist/prod, and dist/teaser static routes successfully.');
  }
} catch (err) {
  console.error('[postbuild] Failed to generate static routes:', err);
}

