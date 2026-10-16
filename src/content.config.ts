import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const devlog = defineCollection({
  loader: glob({
    base: './src/content/devlog',
    pattern: '**/*.md',
  }),
  schema: z.object({
    title: z.string(),
    // Optional so older posts without a date stay valid.
    pubDate: z.coerce.date().optional(),
  }),
});

export const collections = { devlog };
