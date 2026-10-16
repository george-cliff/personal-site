import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { allProjects } from './data/projects';
import { categoryIds } from './data/writing';

// Every article lives directly in src/content/writing/; its file name is its URL slug.
const writing = defineCollection({
  loader: glob({
    base: './src/content/writing',
    pattern: '*.{md,mdx}',
  }),
  schema: z
    .object({
      title: z.string(),
      /** Shown in listings and as the page's meta description. */
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      category: z.enum(categoryIds),
      tags: z.array(z.string()).default([]),
      /** The `id` of a project in src/data/projects.ts (drafts included, so draft articles can use them). */
      project: z
        .string()
        .refine((id) => allProjects.some((project) => project.id === id), {
          message: 'No project with this id in src/data/projects.ts',
        })
        .optional(),
      /** Path to an image in public/, e.g. '/images/atlas.jpg'. */
      image: z.string().optional(),
      imageAlt: z.string().optional(),
      /** Drafts are shown by `astro dev` only, never in the production build. */
      draft: z.boolean().default(false),
    })
    .refine((data) => !data.image || data.imageAlt !== undefined, {
      message: 'Add imageAlt to describe the image (use an empty string if it is decorative)',
      path: ['imageAlt'],
    }),
});

export const collections = { writing };
