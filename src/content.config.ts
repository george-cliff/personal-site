import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const devlog = defineCollection({
  loader: glob({
    base: './src/content/devlog',
    pattern: '**/*.md',
  }),
});

export const collections = { devlog };
