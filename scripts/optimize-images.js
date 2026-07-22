const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/img');
const outputDir = path.join(__dirname, '../public/img/optimized');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.readdirSync(inputDir).forEach((file) => {
  if (file.match(/\.(jpg|jpeg|png|webp)$/)) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);

    sharp(inputPath)
      .resize(800)
      .webp({ quality: 80 })
      .toFile(outputPath)
      .then(() => console.log(`Optimized ${file}`))
      .catch((err) => console.error(`Error optimizing ${file}:`, err));
  }
});