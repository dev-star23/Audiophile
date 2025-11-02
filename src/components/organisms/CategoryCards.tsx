"use client"

import Link from "next/link"
import Image from "next/image"
import { Container } from "../layout/Container"
import { cn } from "@/lib/utils"

export interface CategoryCardsProps {
  className?: string
}

const categories = [
  {
    name: "HEADPHONES",
    href: "/headphones",
    image: "/images/shared/desktop/image-category-thumbnail-headphones.png",
    imageAlt: "Headphones category",
  },
  {
    name: "SPEAKERS",
    href: "/speakers",
    image: "/images/shared/desktop/image-category-thumbnail-speakers.png",
    imageAlt: "Speakers category",
  },
  {
    name: "EARPHONES",
    href: "/earphones",
    image: "/images/shared/desktop/image-category-thumbnail-earphones.png",
    imageAlt: "Earphones category",
  },
]

export function CategoryCards({ className }: CategoryCardsProps) {
  return (
    <section className={cn("mt-16 md:mt-13 py-16 md:py-24", className)}>
      <Container>
        <div className="flex flex-col md:flex-row gap-16 md:gap-3 lg:gap-8">
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className={cn(
                "group relative w-full",
                "bg-muted rounded-lg",
                "flex flex-col items-center text-center",
                // Mobile: vertical stack
                "pt-14 pb-7",
                // Tablet/Desktop: horizontal
                "md:pt-10 md:pb-[25px] md:mt-[50px]",
                "overflow-visible",
                "transition-all hover:scale-[1.02] active:scale-[0.98]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              )}
            >
              {/* Product Image - Positioned above card */}
              {/* Mobile Image */}
              <div
                className="absolute pointer-events-none md:hidden mt-6 md:mt-0"
                style={{
                  top: "0px",
                  left: "50%",
                  transform: "translateX(-50%) translateY(-110px)",
                }}
              >
                <Image
                  src={category.image}
                  alt={category.imageAlt}
                  width={260}
                  height={280}
                  className="object-contain"
                  style={{
                    filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15))",
                    width: "230px",
                    height: "250px",
                    display: "block",
                  }}
                />
              </div>
              {/* Tablet/Desktop Image */}
              <div
                className="absolute pointer-events-none left-1/2 hidden md:block"
                style={{
                  top: "-25px",
                  transform: "translateX(-50%) translateY(-127px)",
                  zIndex: 1,
                }}
              >
                <Image
                  src={category.image}
                  alt={category.imageAlt}
                  width={344}
                  height={370}
                  className="object-contain"
                  style={{
                    filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15))",
                    width: "300px",
                    height: "370px",
                    display: "block",
                  }}
                />
              </div>

              {/* Category Name */}
              <h3 className="text-[15px] md:text-lg font-bold uppercase tracking-[1px] md:tracking-wider mb-3 text-foreground mt-[72px] md:mt-[64px]">
                {category.name}
              </h3>

              {/* Shop Link */}
              <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[1px] text-primary opacity-75 group-hover:opacity-100 group-hover:gap-3 transition-all">
                SHOP
                <Image
                  src="/images/shared/desktop/icon-arrow-right.svg"
                  alt=""
                  width={8}
                  height={12}
                  className="h-3 w-auto"
                />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}

