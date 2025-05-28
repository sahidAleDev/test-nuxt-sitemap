import { defineContentConfig, defineCollection, z } from "@nuxt/content";
import { asSitemapCollection } from "@nuxtjs/sitemap/content";

export default defineContentConfig({
  collections: {
    content: defineCollection(
      asSitemapCollection({
        type: "page",
        source: "**/*.md",
        schema: z.object({
          title: z.string(),
          path: z.string(),
          description: z.string(),
          date: z.string(),
          publishedAt: z.string(),
          postNumber: z.number(),
          slug: z.string(),
          img: z.string(),
          toc: z.boolean().optional(),
        }),
      })
    ),
  },
});
