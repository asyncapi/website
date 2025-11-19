const fs = require('fs');
const path = require('path');

// Fix line endings for all MDX files
const getAllMdxFiles = (dir) => {
  const files = [];
  const items = fs.readdirSync(dir);
  
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...getAllMdxFiles(fullPath));
    } else if (item.endsWith('.mdx')) {
      files.push(fullPath);
    }
  });
  
  return files;
};

const mdxFiles = getAllMdxFiles(path.join(__dirname, 'pages'));
console.log(`Found ${mdxFiles.length} MDX files to process`);

mdxFiles.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    const fixedContent = content.replace(/\r\n/g, '\n');
    fs.writeFileSync(file, fixedContent, 'utf8');
    console.log(`Fixed line endings for ${file}`);
  } catch (error) {
    console.error(`Error processing ${file}:`, error.message);
  }
});