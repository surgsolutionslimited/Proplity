const fs = require('fs');
const path = require('path');

const legacyDir = path.join(__dirname, 'legacy_prototype');
const appDir = path.join(__dirname, 'src', 'app');

const filesToPort = [
  'agency-dashboard.html',
  'property-insights.html',
  'comparable-sales.html',
  'pricing.html',
  'valuation-report.html',
  'sign-in.html',
  'onboarding-goals.html',
  'onboarding-preferences.html',
  'onboarding-complete.html'
];

filesToPort.forEach(file => {
  const filePath = path.join(legacyDir, file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf-8');

  // Extract <main> content
  const mainMatch = content.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  if (!mainMatch) return;
  
  let mainContent = mainMatch[1];

  // Basic HTML to JSX conversions
  mainContent = mainContent.replace(/class=/g, 'className=');
  mainContent = mainContent.replace(/for=/g, 'htmlFor=');
  mainContent = mainContent.replace(/<!--[\s\S]*?-->/g, ''); // Remove comments
  
  // Fix unclosed tags
  mainContent = mainContent.replace(/<img([^>]*?[^\/])>/g, '<img$1 />');
  mainContent = mainContent.replace(/<input([^>]*?[^\/])>/g, '<input$1 />');
  mainContent = mainContent.replace(/<hr([^>]*?[^\/])>/g, '<hr$1 />');
  mainContent = mainContent.replace(/<br([^>]*?[^\/])>/g, '<br$1 />');

  // Fix styles
  mainContent = mainContent.replace(/style="font-variation-settings:'FILL' 1;"/g, 'style={{ fontVariationSettings: "\\\'FILL\\\' 1" }}');
  mainContent = mainContent.replace(/style="([^"]+)"/g, (match, styleString) => {
    // A very naive style object converter for remaining styles
    if (styleString.includes('font-variation-settings')) return match;
    const styleObj = {};
    styleString.split(';').forEach(rule => {
      const parts = rule.split(':');
      if (parts.length === 2) {
        const key = parts[0].trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
        styleObj[key] = parts[1].trim();
      }
    });
    return `style={${JSON.stringify(styleObj)}}`;
  });

  // Fix inline event handlers
  mainContent = mainContent.replace(/onclick="([^"]+)"/gi, 'onClick={() => {}}');
  mainContent = mainContent.replace(/onchange="([^"]+)"/gi, 'onChange={() => {}}');

  // Fix specific SVG issues
  mainContent = mainContent.replace(/stroke-width/g, 'strokeWidth');
  mainContent = mainContent.replace(/stroke-linecap/g, 'strokeLinecap');
  mainContent = mainContent.replace(/stroke-dasharray/g, 'strokeDasharray');
  mainContent = mainContent.replace(/stroke-dashoffset/g, 'strokeDashoffset');
  mainContent = mainContent.replace(/fill-opacity/g, 'fillOpacity');

  const pageName = file.replace('.html', '');
  const dirPath = path.join(appDir, pageName);
  
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const componentName = pageName.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');

  const jsxFile = `import Link from 'next/link';

export default function ${componentName}() {
  return (
    <div className="flex-grow flex flex-col w-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-12 gap-8 pw-page">
      ${mainContent}
    </div>
  );
}
`;

  fs.writeFileSync(path.join(dirPath, 'page.tsx'), jsxFile);
  console.log(`Ported ${file} to src/app/${pageName}/page.tsx`);
});
