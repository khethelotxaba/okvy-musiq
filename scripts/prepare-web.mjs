import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const webDir = path.join(root, 'www');
const files = ['index.html', 'manifest.json', 'sw.js'];
const dirs = ['assets', 'css', 'js'];

fs.rmSync(webDir, { recursive: true, force: true });
fs.mkdirSync(webDir, { recursive: true });

for (const file of files) {
  fs.copyFileSync(path.join(root, file), path.join(webDir, file));
}
for (const dir of dirs) {
  fs.cpSync(path.join(root, dir), path.join(webDir, dir), { recursive: true });
}

if (!fs.existsSync(path.join(webDir, 'index.html'))) {
  throw new Error('Capacitor web directory was not prepared: www/index.html is missing.');
}

console.log('Prepared Capacitor web assets in www/');
