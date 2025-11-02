"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "../atoms/Button"
import { Container } from "../layout/Container"

export interface HeroSectionProps {
  label?: string
  title: string
  description?: string
  ctaText?: string
  ctaHref?: string
}

export function HeroSection({
  label = "NEW PRODUCT",
  title,
  description,
  ctaText = "SEE PRODUCT",
  ctaHref = "/product/xx99-mark-two-headphones",
}: HeroSectionProps) {
  return (
    <section className="relative bg-foreground text-white overflow-hidden border-0">
      {/* Background Image Container - Mobile & Tablet Only */}
      <div className="absolute inset-0 z-0 lg:hidden">
        {/* Mobile Background Image */}
        <Image
          src="/images/home/mobile/image-header.jpg"
          alt=""
          fill
          className="object-cover object-center md:hidden"
          priority
          sizes="100vw"
          quality={90}
        />
        {/* Tablet Background Image */}
        <Image
          src="/images/home/tablet/image-header.jpg"
          alt=""
          fill
          className="hidden md:block object-cover object-center"
          priority
          sizes="100vw"
          quality={90}
        />
      </div>

      {/* Content Container */}
      <Container maxWidth="2xl" className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[510px] md:min-h-[630px] lg:min-h-[632px] py-20 md:py-24 lg:py-0">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left space-y-6 md:space-y-8 px-4 md:px-0">
            {/* New Product Label with decorative line above */}
            {label && (
              <div className="space-y-4">
                {/* Decorative line above NEW PRODUCT */}
                <p className="overline lg:no-underline text-white/50">
                  {label}
                </p>
              </div>
            )}
            {/* Product Title */}
            <h1 className="text-[36px] md:text-[56px] font-bold leading-10 md:leading-[58px] tracking-[1.3px] md:tracking-[2px] uppercase text-white max-w-[396px] mx-auto lg:mx-0">
              {title}
            </h1>

            {/* Product Description */}
            {description && (
              <p className="text-[15px] leading-[25px] text-white/75 max-w-[349px] mx-auto lg:mx-0">
                {description}
              </p>
            )}

            {/* Call-to-Action Button */}
            {ctaText && ctaHref && (
             <div className="pt-4">
                <Button asChild variant="default" size="default">
                 <Link href={ctaHref}>{ctaText}</Link>
                </Button>
              </div>
           )}
          </div>

          {/* Right Column - Product Image (Desktop Only) */}
          <div className="hidden lg:flex relative w-full h-full min-h-[632px] items-center justify-end overflow-visible">
            {/* Background extension to match hero section - covers entire right side */}
            <div className="absolute inset-y-0 left-0 right-0 bg-foreground z-0" />
            <div
              className="relative w-full z-10"
              style={{ height: "420px", maxWidth: "900px", minWidth: "350px" }}
            >
              <Image
                src="/images/home/desktop/image-hero.svg"
                alt="XX99 Mark II Headphones"
                fill
                className="object-contain object-center scale-[1.20] xl:scale-[1.35] opacity-40"
                priority
                sizes="(min-width: 750px) 40vw, 0vw"
                quality={90}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

