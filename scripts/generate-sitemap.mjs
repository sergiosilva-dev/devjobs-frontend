// generate-sitemap.mjs
// Genera sitemap.xml en public/ a partir de rutas conocidas de la SPA
import { writeFile } from 'node:fs/promises';

const BASE = process.env.SITE_URL || 'http://localhost:5173';
const routes = ['/', '/jobs'];

const urls = routes
  .map(
    (path) => `
  <url>
    <loc>${BASE}${path}</loc>
    <changefreq>daily</changefreq>
    <priority>${path === '/' ? '1.0' : '0.8'}</priority>
  </url>`,
  )
  .join('');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`.trim();

await writeFile('public/sitemap.xml', xml, 'utf8');
console.log('✅ sitemap.xml actualizado en public/');
