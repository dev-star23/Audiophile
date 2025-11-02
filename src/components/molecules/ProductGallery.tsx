"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import styles from "./ProductGallery.module.css"

export interface CategoryImage {
  mobile: string
  tablet: string
  desktop: string
}

export interface ProductGalleryProps {
  first?: CategoryImage
  second?: CategoryImage
  third?: CategoryImage
  alt?: string
  className?: string
}

export function ProductGallery({
  first,
  second,
  third,
  alt = "Product gallery",
  className,
}: ProductGalleryProps) {
  return (
    <div
      className={cn(
        styles.productGallery,
        "grid gap-5",
        "grid-cols-1",
        "md:grid-cols-[40%_1fr]",
        "mt-14 md:mt-30 lg:mt-40",
        className
      )}
    >
        {/* First image - area 'a' */}
        {first && (
          <div
            className="relative w-full aspect-square rounded-lg overflow-hidden"
            style={{ gridArea: "a" }}
          >
            <picture>
              <source media="(min-width: 1024px)" srcSet={first.desktop} />
              <source media="(min-width: 768px)" srcSet={first.tablet} />
              <Image
                src={first.mobile}
                alt={`${alt} image 1`}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 40vw, 100vw"
              />
            </picture>
          </div>
        )}

        {/* Second image - area 'b' */}
        {second && (
          <div
            className="relative w-full aspect-square rounded-lg overflow-hidden"
            style={{ gridArea: "b" }}
          >
            <picture>
              <source media="(min-width: 1024px)" srcSet={second.desktop} />
              <source media="(min-width: 768px)" srcSet={second.tablet} />
              <Image
                src={second.mobile}
                alt={`${alt} image 2`}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 40vw, 100vw"
              />
            </picture>
          </div>
        )}

        {/* Third image - area 'c' */}
        {third && (
          <div
            className="relative w-full aspect-4/5 md:aspect-square lg:aspect-auto lg:h-full rounded-lg overflow-hidden"
            style={{ gridArea: "c" }}
          >
            <picture>
              <source media="(min-width: 1024px)" srcSet={third.desktop} />
              <source media="(min-width: 768px)" srcSet={third.tablet} />
              <Image
                src={third.mobile}
                alt={`${alt} image 3`}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 60vw, 100vw"
              />
            </picture>
          </div>
        )}
      </div>
  )
}

