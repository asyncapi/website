import fs from 'fs/promises';
import path from 'path';

const WEBSITE_BASE = 'https://www.asyncapi.com';
const PUBLIC_DIR = './public';

interface SitemapURL {
    loc: string;
    lastmod?: string;
    changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority?: number;
}

function generateSitemapXML(): string {
    const today = new Date().toISOString().split('T')[0];

    const urls: SitemapURL[] = [
        // Homepage
        { loc: `${WEBSITE_BASE}/`, lastmod: today, changefreq: 'weekly', priority: 1.0 },

        // Main sections
        { loc: `${WEBSITE_BASE}/docs`, lastmod: today, changefreq: 'weekly', priority: 0.9 },
        { loc: `${WEBSITE_BASE}/tools`, lastmod: today, changefreq: 'weekly', priority: 0.9 },
        { loc: `${WEBSITE_BASE}/blog`, lastmod: today, changefreq: 'daily', priority: 0.8 },
        { loc: `${WEBSITE_BASE}/community`, lastmod: today, changefreq: 'weekly', priority: 0.7 },

        // Specification pages
        { loc: `${WEBSITE_BASE}/docs/reference/specification/v3.0.0`, lastmod: today, changefreq: 'monthly', priority: 1.0 },
        { loc: `${WEBSITE_BASE}/docs/reference/specification/v2`, lastmod: today, changefreq: 'yearly', priority: 0.5 },

        // Migration guide
        { loc: `${WEBSITE_BASE}/docs/migration/migrating-to-v3`, lastmod: today, changefreq: 'monthly', priority: 0.9 },

        // Core concepts
        { loc: `${WEBSITE_BASE}/docs/concepts`, lastmod: today, changefreq: 'monthly', priority: 0.8 },
        { loc: `${WEBSITE_BASE}/docs/concepts/application`, lastmod: today, changefreq: 'monthly', priority: 0.7 },
        { loc: `${WEBSITE_BASE}/docs/concepts/channel`, lastmod: today, changefreq: 'monthly', priority: 0.7 },
        { loc: `${WEBSITE_BASE}/docs/concepts/message`, lastmod: today, changefreq: 'monthly', priority: 0.7 },
        { loc: `${WEBSITE_BASE}/docs/concepts/server`, lastmod: today, changefreq: 'monthly', priority: 0.7 },
        { loc: `${WEBSITE_BASE}/docs/concepts/protocol`, lastmod: today, changefreq: 'monthly', priority: 0.7 },

        // Tutorials
        { loc: `${WEBSITE_BASE}/docs/tutorials`, lastmod: today, changefreq: 'monthly', priority: 0.8 },
        { loc: `${WEBSITE_BASE}/docs/tutorials/create-asyncapi-document`, lastmod: today, changefreq: 'monthly', priority: 0.8 },
        { loc: `${WEBSITE_BASE}/docs/tutorials/streetlights-interactive`, lastmod: today, changefreq: 'monthly', priority: 0.7 },
        { loc: `${WEBSITE_BASE}/docs/tutorials/message-validation`, lastmod: today, changefreq: 'monthly', priority: 0.7 },
        { loc: `${WEBSITE_BASE}/docs/tutorials/generate-code`, lastmod: today, changefreq: 'monthly', priority: 0.7 },

        // Tools
        { loc: `${WEBSITE_BASE}/docs/tools`, lastmod: today, changefreq: 'weekly', priority: 0.8 },

        // LLM files
        { loc: `${WEBSITE_BASE}/llms.txt`, lastmod: today, changefreq: 'monthly', priority: 0.6 },
        { loc: `${WEBSITE_BASE}/llms-full.txt`, lastmod: today, changefreq: 'monthly', priority: 0.5 },
    ];

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    for (const url of urls) {
        xml += '  <url>\n';
        xml += `    <loc>${escapeXML(url.loc)}</loc>\n`;
        if (url.lastmod) {
            xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
        }
        if (url.changefreq) {
            xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
        }
        if (url.priority !== undefined) {
            xml += `    <priority>${url.priority.toFixed(1)}</priority>\n`;
        }
        xml += '  </url>\n';
    }

    xml += '</urlset>\n';

    return xml;
}

function escapeXML(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

async function main() {
    try {
        console.log('Generating sitemap.xml...\n');

        const sitemapXML = generateSitemapXML();
        await fs.writeFile(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemapXML, 'utf-8');

        console.log('✅ Generated sitemap.xml successfully!');
        console.log('\nGenerated file:');
        console.log('  - public/sitemap.xml');
        console.log('\nThis sitemap complements the existing rss.xml and is designed for broader consumption.');
    } catch (error) {
        console.error('Error generating sitemap.xml:', error);
        process.exit(1);
    }
}

main();
