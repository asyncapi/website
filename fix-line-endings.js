const fs = require('fs');
const path = require('path');

const files = [
  'pages/_app.tsx',
  'components/layout/DocsLayout.tsx',
  'components/layout/GenericLayout.tsx'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const fixedContent = content.replace(/\r\n/g, '\n');
  fs.writeFileSync(filePath, fixedContent, 'utf8');
  console.log(`Fixed line endings for ${file}`);
});