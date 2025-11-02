"use client"

import Image from "next/image"
import { Container } from "./Container"
import { cn } from "@/lib/utils"

export interface AboutSectionProps {
  className?: string
}

export function AboutSection({ className }: AboutSectionProps) {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <Container>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image - Mobile/Tablet: First, Desktop: Last */}
          <div className="relative w-full aspect-4/3 lg:aspect-square rounded-lg overflow-hidden order-first lg:order-last">
            <Image
              src="/images/shared/mobile/image-best-gear.jpg"
              alt="A man wearing headphones in Audiophile store"
              fill
              className="object-cover object-center md:hidden rounded-lg"
              quality={100}
              sizes="100vw"
            />
            <Image
              src="/images/shared/tablet/image-best-gear.jpg"
              alt="A man wearing headphones in Audiophile store"
              fill
              className="hidden md:block lg:hidden object-cover object-center rounded-lg"
              quality={100}
              sizes="100vw"
            />
            <Image
              src="/images/shared/desktop/image-best-gear.jpg"
              alt="A man wearing headphones in Audiophile store"
              fill
              className="hidden lg:block object-cover object-center rounded-lg"
              quality={100}
              sizes="(min-width: 1024px) 50vw, 0px"
            />
          </div>

          {/* Text Content - Mobile/Tablet: Below image, Desktop: Left side */}
          <div className="flex flex-col items-center lg:items-start justify-center text-center lg:text-left space-y-8 px-6 md:px-0">
            <h2 className="text-[22px] md:text-[32px] lg:text-[32px] font-bold leading-8 md:leading-[52px] lg:leading-[58px] tracking-[2px] uppercase text-foreground max-w-[445px]">
              BRINGING YOU THE{" "}
              <span className="text-primary">BEST</span>  AUDIO GEAR
            </h2>
            <p className="text-[15px] leading-[25px] text-foreground/50 max-w-[445px]">
              Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}

