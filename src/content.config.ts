import { defineCollection, z, reference } from "astro:content";
import { glob } from "astro/loaders";

function removeDupsAndLowerCase(array: string[]) {
  if (!array.length) return array;
  const lowercaseItems = array.map((str) => str.toLowerCase());
  const distinctItems = new Set(lowercaseItems);
  return Array.from(distinctItems);
}

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  // Required
  schema: ({ image }) =>
    z.object({
      // Required
      title: z.string().max(60),
      description: z.string().max(160),
      publishDate: z.coerce.date(),
      // Optional
      updatedDate: z.coerce.date().optional(),
      heroImage: z
        .object({
          src: image(),
          alt: z.string().optional(),
          inferSize: z.boolean().optional(),
          width: z.number().optional(),
          height: z.number().optional(),

          color: z.string().optional(),
        })
        .optional(),
      tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
      language: z.string().optional(),
      draft: z.boolean().default(false),
      // Special fields
      comment: z.boolean().default(true),
      projects: z.array(reference("projects")).optional(),
    }),
});

const projects = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/projects", pattern: "**/*.{md,mdx}" }),
  // Required
  schema: ({ image }) =>
    z.object({
      // Required
      title: z.string().max(60),
      description: z.string().max(160),
      startDate: z.coerce.date(),
      thumbnail: z
        .object({
          src: image(),
          alt: z.string(),
          inferSize: z.boolean().optional(),
          width: z.number().optional(),
          height: z.number().optional(),

          color: z.string().optional(),
        })
        .optional(),
      progress: z.array(reference("blog")).optional(),
    }),
});

// Define docs collection
// const docs = defineCollection({
//   loader: glob({ base: './src/content/docs', pattern: '**/*.{md,mdx}' }),
//   schema: () =>
//     z.object({
//       title: z.string().max(60),
//       description: z.string().max(160),
//       publishDate: z.coerce.date().optional(),
//       updatedDate: z.coerce.date().optional(),
//       tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
//       draft: z.boolean().default(false),
//       // Special fields
//       order: z.number().default(999)
//     })
// })

export const collections = { blog, projects };
