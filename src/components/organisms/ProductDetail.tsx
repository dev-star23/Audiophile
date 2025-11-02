"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../atoms/Button"
import { NumberInput } from "../atoms/NumberInput"
import { Container } from "../layout/Container"
import { ProductGallery } from "../molecules/ProductGallery"
import { cn } from "@/lib/utils"
import type { Product } from "@/data/products"

export interface ProductDetailProps {
  product: Product
  className?: string
}

export function ProductDetail({ product, className }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    // TODO: Implement cart functionality
    console.log(`Added ${quantity} ${product.title} to cart`)
    // Reset quantity after adding to cart
    setQuantity(1)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className={cn("py-6 md:py-8", className)}>
      <Container>
        {/* Go Back Button */}
        <Link
          href={product.categoryPath}
          className="inline-block text-[15px] leading-[25px] text-foreground/50 hover:text-primary transition-colors mb-6 md:mb-14"
        >
          Go Back
        </Link>

        {/* Main Product Section */}
        <section className="mb-16 md:mb-24 lg:mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-32 items-center">
            {/* Product Image */}
            <div className="relative w-full aspect-square bg-muted rounded-lg overflow-hidden">
              {/* Mobile Image */}
              <Image
                src={product.imgMobile}
                alt={product.imgAlt}
                fill
                className="object-contain p-8 md:hidden"
                sizes="100vw"
              />
              {/* Tablet Image */}
              <Image
                src={product.imgTablet}
                alt={product.imgAlt}
                fill
                className="hidden md:block lg:hidden object-contain p-12"
                sizes="100vw"
              />
              {/* Desktop Image */}
              <Image
                src={product.imgDesktop}
                alt={product.imgAlt}
                fill
                className="hidden lg:block object-contain p-12"
                sizes="50vw"
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center space-y-6 text-center lg:text-left">
              {/* New Product Label */}
              {product.new && (
                <p className="overline text-primary">NEW PRODUCT</p>
              )}

              {/* Product Title */}
              <h1 className="text-[28px] md:text-[40px] font-bold leading-8 md:leading-11 tracking-[1px] md:tracking-[1.5px] uppercase text-foreground">
                {product.title}
              </h1>

              {/* Product Description */}
              <p className="text-[15px] leading-[25px] text-foreground/75 max-w-[445px] mx-auto lg:mx-0">
                {product.description}
              </p>

              {/* Price */}
              <p className="text-[18px] font-bold tracking-[1.3px] text-foreground">
                {formatPrice(product.price)}
              </p>

              {/* Add to Cart Section */}
              <div className="flex flex-col lg:flex-row gap-4 pt-4">
                <NumberInput
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value) || 1)}
                  min={1}
                  className="w-full sm:w-auto"
                />
                <Button
                  onClick={handleAddToCart}
                  variant="default"
                  size="default"
                  className="flex-1 sm:flex-initial"
                >
                  ADD TO CART
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features and In The Box Section */}
        <section className="mb-16 md:mb-24 lg:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 lg:gap-32">
            {/* Features */}
            <div>
              <h2 className="text-[24px] md:text-[32px] font-bold leading-9 tracking-[0.9px] uppercase text-foreground mb-6 md:mb-8">
                FEATURES
              </h2>
              <div className="space-y-4">
                {product.features.map((feature, index) => (
                  <p
                    key={index}
                    className="text-[15px] leading-[25px] text-foreground/75 whitespace-pre-line"
                  >
                    {feature}
                  </p>
                ))}
              </div>
            </div>

            {/* In The Box */}
            <div>
              <h2 className="text-[24px] md:text-[32px] font-bold leading-9 tracking-[0.9px] uppercase text-foreground mb-6 md:mb-8">
                IN THE BOX
              </h2>
              <ul className="space-y-2">
                {product.inTheBox.map((item, index) => (
                  <li key={index} className="flex gap-6">
                    <span className="text-primary font-bold min-w-[30px]">
                      {item.quantity}x
                    </span>
                    <span className="text-[15px] leading-[25px] text-foreground/75">
                      {item.item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section>
          <ProductGallery
            first={product.gallery.first}
            second={product.gallery.second}
            third={product.gallery.third}
            alt={product.title}
          />
        </section>
      </Container>
    </div>
  )
}

