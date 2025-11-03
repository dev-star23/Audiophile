import type { Id } from "../../convex/_generated/dataModel";
import type { Product } from "@/data/products";

// Transform Convex product data to the app's Product format
export function transformProduct(convexProduct: {
  _id: Id<"products">;
  _creationTime: number;
  id: number;
  slug: string;
  name: string;
  image: { mobile: string; tablet: string; desktop: string };
  category: "headphones" | "speakers" | "earphones";
  categoryImage: { mobile: string; tablet: string; desktop: string };
  new: boolean;
  price: number;
  description: string;
  features: string;
  includes: Array<{ quantity: number; item: string }>;
  gallery: {
    first: { mobile: string; tablet: string; desktop: string };
    second: { mobile: string; tablet: string; desktop: string };
    third: { mobile: string; tablet: string; desktop: string };
  };
  others: Array<{
    slug: string;
    name: string;
    image: { mobile: string; tablet: string; desktop: string };
  }>;
}): Product {
  // Split features string by double newlines to create array
  const featuresArray = convexProduct.features.split("\n\n").filter(Boolean);

  return {
    id: convexProduct.slug, // Use slug as id
    slug: convexProduct.slug,
    category: convexProduct.category,
    categoryPath: `/${convexProduct.category}`,
    new: convexProduct.new,
    title: convexProduct.name.toUpperCase(),
    description: convexProduct.description,
    price: convexProduct.price,
    features: featuresArray,
    inTheBox: convexProduct.includes.map((item) => ({
      quantity: item.quantity,
      item: item.item,
    })),
    img: convexProduct.categoryImage.desktop,
    imgMobile: convexProduct.categoryImage.mobile,
    imgTablet: convexProduct.categoryImage.tablet,
    imgDesktop: convexProduct.categoryImage.desktop,
    imgAlt: convexProduct.name,
    gallery: convexProduct.gallery,
  };
}

