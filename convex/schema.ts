import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    id: v.number(),
    slug: v.string(),
    name: v.string(),
    image: v.object({
      mobile: v.string(),
      tablet: v.string(),
      desktop: v.string(),
    }),
    category: v.union(v.literal("headphones"), v.literal("speakers"), v.literal("earphones")),
    categoryImage: v.object({
      mobile: v.string(),
      tablet: v.string(),
      desktop: v.string(),
    }),
    new: v.boolean(),
    price: v.number(),
    description: v.string(),
    features: v.string(),
    includes: v.array(
      v.object({
        quantity: v.number(),
        item: v.string(),
      })
    ),
    gallery: v.object({
      first: v.object({
        mobile: v.string(),
        tablet: v.string(),
        desktop: v.string(),
      }),
      second: v.object({
        mobile: v.string(),
        tablet: v.string(),
        desktop: v.string(),
      }),
      third: v.object({
        mobile: v.string(),
        tablet: v.string(),
        desktop: v.string(),
      }),
    }),
    others: v.array(
      v.object({
        slug: v.string(),
        name: v.string(),
        image: v.object({
          mobile: v.string(),
          tablet: v.string(),
          desktop: v.string(),
        }),
      })
    ),
  }).index("by_slug", ["slug"]).index("by_category", ["category"]),
});

