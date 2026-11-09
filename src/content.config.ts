import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const faq = z.object({ q: z.string(), a: z.string() });

/** Technology service pages: /technology/<slug> */
const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    navTitle: z.string(),
    order: z.number(),
    icon: z.string(),
    metaTitle: z.string().max(60),
    metaDescription: z.string().max(155),
    h1: z.string(),
    summary: z.string(),
    intro: z.string(),
    whatWeDo: z.array(z.object({ title: z.string(), text: z.string() })),
    deliverables: z.array(z.string()),
    packages: z.array(
      z.object({
        name: z.string(),
        priceKey: z.string(),
        summary: z.string(),
        includes: z.array(z.string()),
      }),
    ),
    faqs: z.array(faq),
  }),
});

/** Academy programmes */
const programmes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/programmes' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    free: z.boolean().default(false),
    format: z.array(z.string()),
    learn: z.array(z.string()),
    outcomes: z.array(z.string()),
    faqs: z.array(faq).default([]),
  }),
});

/** Shop products (Ozzie Naturals and Digital Products). Cards only render when a file exists here. */
const products = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/products' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      line: z.enum(['naturals', 'digital']),
      kind: z.string(), // e.g. 'Ebook', 'Template', 'Hair oil'
      description: z.string(),
      price: z.string().optional(),
      link: z.string().url(),
      platform: z.enum(['Selar', 'Amazon']),
      image: image().optional(),
      imageAlt: z.string().optional(),
    }),
});

/** Case studies: /case-studies/<slug> */
const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/case-studies' }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    url: z.string().url(),
    sector: z.string(),
    h1: z.string(),
    metaTitle: z.string().max(60),
    metaDescription: z.string().max(155),
    summary: z.string(),
    need: z.string(),
    built: z.string(),
    features: z.array(z.object({ title: z.string(), text: z.string() })),
    stack: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

export const collections = { services, programmes, products, 'case-studies': caseStudies };
