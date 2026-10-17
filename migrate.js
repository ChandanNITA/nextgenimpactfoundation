const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = process.cwd();
const srcDir = path.join(rootDir, 'src');

// 1. Create src directory
if (!fs.existsSync(srcDir)) {
  fs.mkdirSync(srcDir, { recursive: true });
}

// 2. Move root folders to src (except public, app, node_modules, .next)
const dirsToMove = ['components', 'lib', 'hooks', 'data', 'types'];
for (const dir of dirsToMove) {
  const srcPath = path.join(rootDir, dir);
  const destPath = path.join(srcDir, dir);
  if (fs.existsSync(srcPath)) {
    fs.renameSync(srcPath, destPath);
  }
}

// 3. Process app folder into src/pages
const appDir = path.join(rootDir, 'app');
const pagesDir = path.join(srcDir, 'pages');
if (!fs.existsSync(pagesDir)) {
  fs.mkdirSync(pagesDir, { recursive: true });
}

let routes = [];

function processAppDir(currentPath, currentRoutePath) {
  const entries = fs.readdirSync(currentPath, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      // Ignore route groups like (marketing)
      const folderName = entry.name;
      const isRouteGroup = folderName.startsWith('(') && folderName.endsWith(')');
      const nextRoutePath = isRouteGroup ? currentRoutePath : path.join(currentRoutePath, folderName);
      processAppDir(path.join(currentPath, folderName), nextRoutePath);
    } else if (entry.name === 'page.tsx') {
      const pagePath = path.join(currentPath, entry.name);
      let content = fs.readFileSync(pagePath, 'utf-8');
      
      // Transform Next.js imports
      content = content.replace(/import\s+Image\s+from\s+['"]next\/image['"];?/g, '');
      content = content.replace(/import\s+Link\s+from\s+['"]next\/link['"];?/g, "import { Link } from 'react-router-dom';");
      content = content.replace(/<Image[^>]*src=(['"])(.*?)\1[^>]*\/>/g, '<img src=$1$2$1 className="w-full h-auto object-cover" />');
      content = content.replace(/<Image[^>]*src=\{([^}]+)\}[^>]*\/>/g, '<img src={$1} className="w-full h-auto object-cover" />');
      content = content.replace(/<Image/g, '<img');
      content = content.replace(/href=/g, 'to=');
      
      // Remove metadata
      content = content.replace(/export\s+const\s+metadata[^;]*;/g, '');
      
      // Determine component name and route
      let routeUrl = currentRoutePath.replace(/\\/g, '/');
      if (routeUrl === '') routeUrl = '/';
      else routeUrl = '/' + routeUrl;
      
      // Handle dynamic routes like [slug]
      let reactRouterPath = routeUrl.replace(/\[([^\]]+)\]/g, ':$1');
      
      // We need a unique filename for the page component
      const isDynamic = currentRoutePath.includes('[');
      let fileName = currentRoutePath === '' ? 'Home.tsx' : 
                     currentRoutePath.replace(/\\/g, '-').replace(/\[|\]/g, '') + '.tsx';
                     
      if (fileName.startsWith('-')) fileName = fileName.substring(1);
      
      const destPath = path.join(pagesDir, fileName);
      fs.writeFileSync(destPath, content);
      
      routes.push({
        path: reactRouterPath,
        componentPath: `./pages/${fileName}`,
        name: fileName.replace('.tsx', '')
      });
    }
  }
}

if (fs.existsSync(appDir)) {
  processAppDir(appDir, '');
}

// 4. Generate App.tsx
const appTsxContent = `import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

${routes.map(r => `import ${r.name.replace(/-/g, '')} from '${r.componentPath}';`).join('\n')}

export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            ${routes.map(r => `<Route path="${r.path}" element={<${r.name.replace(/-/g, '')} />} />`).join('\n            ')}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
`;
fs.writeFileSync(path.join(srcDir, 'App.tsx'), appTsxContent);

// 5. Generate main.tsx
const mainTsxContent = `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './app/globals.css' // We'll move globals.css

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
`;
fs.writeFileSync(path.join(srcDir, 'main.tsx'), mainTsxContent);

// Move globals.css
const cssDestDir = path.join(srcDir, 'app');
fs.mkdirSync(cssDestDir, { recursive: true });
if (fs.existsSync(path.join(appDir, 'globals.css'))) {
  fs.copyFileSync(path.join(appDir, 'globals.css'), path.join(cssDestDir, 'globals.css'));
}

// 6. Fix components and other TSX files in src
function processDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      
      let changed = false;
      if (content.includes('next/link')) {
        content = content.replace(/import\s+Link\s+from\s+['"]next\/link['"];?/g, "import { Link } from 'react-router-dom';");
        content = content.replace(/href=/g, 'to=');
        changed = true;
      }
      if (content.includes('next/image')) {
        content = content.replace(/import\s+Image\s+from\s+['"]next\/image['"];?/g, '');
        content = content.replace(/<Image[^>]*src=(['"])(.*?)\1[^>]*\/>/g, '<img src=$1$2$1 className="w-full h-auto object-cover" />');
        content = content.replace(/<Image[^>]*src=\{([^}]+)\}[^>]*\/>/g, '<img src={$1} className="w-full h-auto object-cover" />');
        content = content.replace(/<Image/g, '<img');
        changed = true;
      }
      if (content.includes('next/navigation')) {
        content = content.replace(/import\s+\{\s*useRouter\s*\}\s+from\s+['"]next\/navigation['"];?/g, "import { useNavigate as useRouter } from 'react-router-dom';");
        content = content.replace(/useRouter\(\)/g, 'useRouter()'); // Keep useRouter name but it is useNavigate under the hood
        changed = true;
      }
      
      if (changed) {
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}
processDir(path.join(srcDir, 'components'));
processDir(path.join(srcDir, 'pages'));

// 7. Write index.html
const indexHtmlContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>NextGen Impact Foundation</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;
fs.writeFileSync(path.join(rootDir, 'index.html'), indexHtmlContent);

// 8. Write vite.config.ts
const viteConfigContent = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
`;
fs.writeFileSync(path.join(rootDir, 'vite.config.ts'), viteConfigContent);

console.log("Migration script complete.");
