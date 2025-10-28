const fs = require('fs');
const path = require('path');

console.log('Running smoke tests...\n');

let errors = 0;

// Check required modules can be resolved
const modules = [
  'next',
  'react',
  'react-dom',
  'tailwindcss',
  '@tailwindcss/postcss',
  'postcss',
  'zustand',
  'recharts',
  'xlsx',
  'file-saver',
];

console.log('Checking modules...');
modules.forEach((mod) => {
  try {
    require.resolve(mod);
    console.log(`✓ ${mod}`);
  } catch {
    console.log(`✗ ${mod} - NOT FOUND`);
    errors++;
  }
});

// Check package.json has locked versions
console.log('\nChecking package.json versions...');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };

let floatingVersions = [];
Object.entries(deps).forEach(([name, version]) => {
  if (version.startsWith('^') || version.startsWith('~') || version === 'latest') {
    floatingVersions.push(`${name}: ${version}`);
  }
});

if (floatingVersions.length > 0) {
  console.log('✗ Floating versions found:');
  floatingVersions.forEach((v) => console.log(`  - ${v}`));
  errors++;
} else {
  console.log('✓ All versions pinned');
}

// Check required scripts
console.log('\nChecking npm scripts...');
const requiredScripts = ['dev', 'build', 'start', 'lint', 'typecheck', 'prepare', 'test:smoke'];
requiredScripts.forEach((script) => {
  if (packageJson.scripts[script]) {
    console.log(`✓ ${script}`);
  } else {
    console.log(`✗ ${script} - MISSING`);
    errors++;
  }
});

// Check required files exist
console.log('\nChecking required files...');
const requiredFiles = [
  'app/layout.tsx',
  'app/(marketing)/page.tsx',
  'app/app/page.tsx',
  'app/analytics/page.tsx',
  'app/globals.css',
  'components/SubscriptionForm.tsx',
  'components/SubscriptionCard.tsx',
  'components/ExportMenu.tsx',
  'lib/store.ts',
  'lib/types.ts',
  'lib/formatting.ts',
  'lib/export.ts',
  'lib/analytics.ts',
  'lib/demo.ts',
  'next.config.mjs',
  'postcss.config.mjs',
  'tsconfig.json',
  'README.md',
];

requiredFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    console.log(`✓ ${file}`);
  } else {
    console.log(`✗ ${file} - NOT FOUND`);
    errors++;
  }
});

console.log(`\n${errors === 0 ? '✓ All checks passed!' : `✗ ${errors} error(s) found`}`);
process.exit(errors);

