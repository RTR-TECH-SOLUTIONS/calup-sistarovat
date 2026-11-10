/**
 * Articolele de pe site: câte un fișier Markdown în
 * src/content/articole/<limba>/<adresa>.md. Formatul e descris în README-ul
 * din acel dosar.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const articole = defineCollection({
  loader: glob({
    pattern: '{ro,en,de}/*.md',
    base: './src/content/articole',
    // Id-ul e chiar calea, „ro/nume-fisier”: din ea citim limba și adresa.
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    titlu: z.string(),
    descriere: z.string(),
    data: z.coerce.date(),
    /** Leagă traducerile între ele. Implicit e numele fișierului. */
    cheie: z.string().optional(),
  }),
});

export const collections = { articole };
