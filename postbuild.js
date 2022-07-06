/**
 * Simple hack to merge declarations for
 * ambient modules so user doesn't have to
 * define globals. Good enough for this purpose.
 */
const { appendFileSync, copyFileSync } = require('fs');
const { join } = require('path');
const cwd = process.cwd();
const indexPath = join(cwd, 'dist/types/index.d.ts');
const modulePath = join(cwd, 'src/ambient.d.ts');
const typesPath = join(cwd, 'dist/types/ambient.d.ts');
copyFileSync(modulePath, typesPath);
appendFileSync(indexPath, `import './ambient';`);