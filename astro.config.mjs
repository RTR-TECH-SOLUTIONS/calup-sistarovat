// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Previzualizarea stă pe demo.mrwebsites.ro/calup-sistarovat/, deci CI-ul pune
// SITE_URL și SITE_BASE. Căile interne trec toate prin `cale()` din src/lib/cale.ts.
const site = process.env.SITE_URL || 'https://demo.mrwebsites.ro';
const base = process.env.SITE_BASE || '/';

export default defineConfig({
  site,
  base,
  devToolbar: { enabled: false },
  vite: {
    plugins: [tailwindcss()],
  },
});
