import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const seedProducts = mutation({
  args: {
    products: v.array(
      v.object({
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
      })
    ),
  },
  handler: async (ctx, args) => {
    // Clear existing products
    const existingProducts = await ctx.db.query("products").collect();
    for (const product of existingProducts) {
      await ctx.db.delete(product._id);
    }

    // Insert new products
    for (const product of args.products) {
      await ctx.db.insert("products", product);
    }

    return { success: true, count: args.products.length };
  },
});

