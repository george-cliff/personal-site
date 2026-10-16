import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import expressiveCode from 'astro-expressive-code';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://georgecliff.com',
  integrations: [
    expressiveCode(),
    mdx(),
    sitemap(),
    icon(),
  ],
});
