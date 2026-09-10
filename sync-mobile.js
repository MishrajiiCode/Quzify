const fs = require('fs');
const path = require('path');

const srcDir = __dirname;
const targetDir = path.join(__dirname, 'mobile', 'assets', 'web');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const fileExtensions = ['.html', '.css', '.js', '.mp4', '.png', '.json'];
const excludeFiles = ['package.json', 'package-lock.json'];

const files = fs.readdirSync(srcDir);
let copiedCount = 0;

files.forEach(file => {
  const ext = path.extname(file).toLowerCase();
  if (fileExtensions.includes(ext) && !excludeFiles.includes(file)) {
    const srcPath = path.join(srcDir, file);
    const stat = fs.statSync(srcPath);
    if (stat.isFile()) {
      fs.copyFileSync(srcPath, path.join(targetDir, file));
      copiedCount++;
    }
  }
});

console.log(`Successfully synced ${copiedCount} web assets to mobile/assets/web/`);
