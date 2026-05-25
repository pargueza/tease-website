import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    description: z.string(),
  }),
});

const pages = defineCollection({
  schema: z.object({
    title: z.string(),
    body: z.string().optional(),
  }),
});

export const collections = { blog, pages };