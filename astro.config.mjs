import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import expressiveCode from 'astro-expressive-code';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://georgecliff.com',
  // Old URLs from before Devlog and Misc moved under /writing/.
  redirects: {
    '/devlog': '/writing/devlog/',
    '/devlog/hello-world': '/writing/devlog/hello-world/',
    '/misc': '/writing/hobbies/',
  },
  integrations: [
    expressiveCode(),
    mdx(),
    sitemap(),
    icon(),
  ],
});
