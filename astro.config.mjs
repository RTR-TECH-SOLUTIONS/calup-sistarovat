// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Previzualizarea stă pe demo.mrwebsites.ro/calup-sistarovat/, deci CI-ul pune
// SITE_URL și SITE_BASE. Căile interne trec toate prin `cale()` din src/lib/cale.ts.
const site = process.env.SITE_URL || 'https://demo.mrwebsites.ro';
const base = process.env.SITE_BASE || '/';

export default defineConfig({
  site,
  base,
  devToolbar: { enabled: false },
  // Fonturile se descarcă la build și se servesc de pe site, nu de la Google.
  // latin-ext aduce ș, ț și ă; browserul îl cere doar unde apar.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'IBM Plex Sans',
      cssVariable: '--font-plex-sans',
      weights: [400, 500, 600],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'IBM Plex Mono',
      cssVariable: '--font-plex-mono',
      weights: [400, 500],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['ui-monospace', 'monospace'],
    },
    {
      provider: fontProviders.google(),
      name: 'Newsreader',
      cssVariable: '--font-newsreader',
      weights: [400, 500],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['Georgia', 'serif'],
      options: { experimental: { variableAxis: { opsz: ['6..72'] } } },
    },
    // Doar pentru numele din antet, ca să semene cu sigla clientului. Numele e
    // în germană, deci ajunge setul latin (Ü, Ä).
    {
      provider: fontProviders.google(),
      name: 'Montserrat',
      cssVariable: '--font-montserrat',
      weights: [500, 700],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
