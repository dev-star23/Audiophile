"use client"

import Image from "next/image"
import Link from "next/link"
import { useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"
import { Button } from "../atoms/Button"
import { Container } from "../layout/Container"
import { cn } from "@/lib/utils"
import type { Product } from "@/data/products"
import { transformProduct } from "@/lib/convex"

export interface YouMayAlsoLikeProps {
  currentProduct: Product
  className?: string
}

export function YouMayAlsoLike({ currentProduct, className }: YouMayAlsoLikeProps) {
  // Fetch all products from Convex
  const convexProducts = useQuery(api.products.getAll) || []
  const allProducts = convexProducts.map(transformProduct)

  // Get products from the same category, excluding the current product
  const sameCategoryProducts = allProducts.filter(
    (product) =>
      product.category === currentProduct.category && product.slug !== currentProduct.slug
  )

  // Determine which products to show
  let recommendedProducts: Product[] = []

  if (sameCategoryProducts.length >= 3) {
    // If we have 3+ products in the same category, show the first 3
    recommendedProducts = sameCategoryProducts.slice(0, 3);
  } else {
    // Start with same category products
    recommendedProducts = [...sameCategoryProducts]

    // Fill remaining slots (to reach 3 total) with products from other categories
    const otherCategoryProducts = allProducts.filter(
      (product) =>
        product.category !== currentProduct.category && product.slug !== currentProduct.slug
    )

    // Calculate how many we need to fill to reach 3 total
    const needed = 3 - sameCategoryProducts.length

    // Add products from other categories to fill up to 3
    recommendedProducts.push(...otherCategoryProducts.slice(0, needed))
  }

  // If we still don't have enough products (edge case), just show what we have
  if (recommendedProducts.length === 0) {
    return null
  }

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <Container>
        {/* Section Title */}
        <h2 className="text-[24px] md:text-[32px] font-bold leading-9 tracking-[0.9px] uppercase text-foreground text-center mb-10 md:mb-14">
          YOU MAY ALSO LIKE
        </h2>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-4 lg:gap-8">
          {recommendedProducts.map((product) => (
            <div key={product.slug} className="flex flex-col items-center">
              {/* Product Image */}
              <div className="relative w-full aspect-square bg-muted rounded-lg overflow-hidden mb-6">
                {/* Mobile Image */}
                <Image
                  src={product.imgMobile}
                  alt={product.imgAlt}
                  fill
                  className="object-contain p-6 md:hidden"
                  sizes="100vw"
                />
                {/* Tablet Image */}
                <Image
                  src={product.imgTablet}
                  alt={product.imgAlt}
                  fill
                  className="hidden md:block lg:hidden object-contain p-8"
                  sizes="33vw"
                />
                {/* Desktop Image */}
                <Image
                  src={product.imgDesktop}
                  alt={product.imgAlt}
                  fill
                  className="hidden lg:block object-contain p-8"
                  sizes="33vw"
                />
              </div>

              {/* Product Name */}
              <h3 className="text-[20px] md:text-[12px] lg:text-lg xl:text-2xl font-bold leading-[33px] tracking-[1.7px] uppercase text-foreground text-center mb-6">
                {product.title}
              </h3>

              {/* See Product Button */}
              <Button asChild variant="default" size="default">
                <Link href={`/product/${product.slug}`}>SEE PRODUCT</Link>
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

