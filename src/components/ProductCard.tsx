"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { Container } from "./Container"
import { cn } from "@/lib/utils"

export interface ProductCardProps {
  new?: boolean
  title: string
  description: string
  img: string
  imgMobile?: string
  imgTablet?: string
  imgDesktop?: string
  imgAlt?: string
  imagePos?: "left" | "right"
  ctaText?: string
  ctaHref?: string
  className?: string
}

export function ProductCard({
  new: isNew = false,
  title,
  description,
  img,
  imgMobile,
  imgTablet,
  imgDesktop,
  imgAlt,
  imagePos = "right",
  ctaText = "SEE PRODUCT",
  ctaHref,
  className,
}: ProductCardProps) {
  const isImageRight = imagePos === "right"
  // Use responsive images if provided, otherwise fall back to single img
  const mobileImg = imgMobile || img
  const tabletImg = imgTablet || img
  const desktopImg = imgDesktop || img
  
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <Container>
        <div
          className={cn(
            "grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center",
            // Reverse order on desktop if image is on left
            !isImageRight && "lg:grid-flow-col-dense"
          )}
        >
          {/* Image Section */}
          <div
            className={cn(
              "relative w-full aspect-square bg-muted rounded-lg overflow-hidden",
              // Mobile: image always on right, so order-2 when desktop has it on left
              !isImageRight ? "lg:col-start-2 lg:order-2" : "lg:order-1"
            )}
          >
            {/* Mobile Image */}
            <Image
              src={mobileImg}
              alt={imgAlt || title}
              fill
              className="object-contain p-8 md:hidden"
              sizes="100vw"
            />
            {/* Tablet Image */}
            <Image
              src={tabletImg}
              alt={imgAlt || title}
              fill
              className="hidden md:block lg:hidden object-contain p-12"
              sizes="100vw"
            />
            {/* Desktop Image */}
            <Image
              src={desktopImg}
              alt={imgAlt || title}
              fill
              className="hidden lg:block object-contain p-12"
              sizes="50vw"
            />
          </div>

          {/* Text Content Section */}
          <div
            className={cn(
              "flex flex-col justify-center space-y-6 md:space-y-8",
              "text-center lg:text-left",
              // Order text content based on image position
              !isImageRight ? "lg:col-start-1 lg:order-1" : "lg:order-2"
            )}
          >
            {/* New Product Label */}
            {isNew && (
              <p className="overline text-primary">
                NEW PRODUCT
              </p>
            )}

            {/* Product Title */}
            <h2 className="text-[28px] md:text-[40px] font-bold leading-[38px] md:leading-[44px] tracking-[1px] md:tracking-[1.5px] uppercase text-foreground">
              {title}
            </h2>

            {/* Product Description */}
            <p className="text-[15px] leading-[25px] text-foreground/75 max-w-[445px] mx-auto lg:mx-0">
              {description}
            </p>

            {/* Call-to-Action Button */}
            {ctaHref && (
              <div className="pt-4">
                <Button asChild variant="default" size="default">
                  <Link href={ctaHref}>{ctaText}</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}

