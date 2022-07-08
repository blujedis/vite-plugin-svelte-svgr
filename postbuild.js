/**
 * Simple hack to merge declarations for
 * ambient modules so user doesn't have to
 * define globals. Good enough for this purpose.
 */
const { appendFileSync, copyFileSync } = require('fs');
copyFileSync('./src/ambient.d.ts', './dist/types/ambient.d.ts');
appendFileSync('./dist/types/index.d.ts', `import './ambient';`);
