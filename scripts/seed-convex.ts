/**
 * Script to seed Convex database with products from db.json
 * 
 * Run this script after setting up Convex:
 * 1. Make sure you have NEXT_PUBLIC_CONVEX_URL in your .env.local
 * 2. Run: npx tsx scripts/seed-convex.ts
 * 
 * Or use the Convex dashboard to run the mutation directly:
 * convex run seed:seedProducts --args '{"products": <paste data from db.json>}'
 */

import fs from "fs";
import { resolve } from "path";
import { ConvexHttpClient } from "convex/browser";
import { config } from "dotenv";
import { api } from "../convex/_generated/api";

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), ".env.local") });

// Read db.json from project root
const dbJsonPath = resolve(process.cwd(), "db.json");
const dbData = JSON.parse(
  fs.readFileSync(dbJsonPath, "utf-8")
);

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!CONVEX_URL) {
  console.error("Please set NEXT_PUBLIC_CONVEX_URL in your .env.local file");
  process.exit(1);
}

// TypeScript now knows CONVEX_URL is defined after the check above
const convexUrl: string = CONVEX_URL;

async function seed() {
  const client = new ConvexHttpClient(convexUrl);
  
  console.log("Seeding products to Convex...");
  console.log(`Found ${dbData.data.length} products`);

  try {
    const result = await client.mutation(api.seed.seedProducts, {
      products: dbData.data,
    });

    console.log(`✅ Successfully seeded ${result.count} products!`);
  } catch (error) {
    console.error("❌ Error seeding products:", error);
    process.exit(1);
  }
}

seed();

