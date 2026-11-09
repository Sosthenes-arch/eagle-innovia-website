// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// BASE_PATH lets the same build work on the GitHub Pages preview URL
// (https://<user>.github.io/eagleinnovia-website/) and on the custom domain (/).
// Set it in .github/workflows/deploy.yml.
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site: 'https://www.eagleinnovia.com',
  base,
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory', inlineStylesheets: 'always' },
  integrations: [
    sitemap({
      filter: (page) => !/\/(thank-you|404)\/?$/.test(page),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
