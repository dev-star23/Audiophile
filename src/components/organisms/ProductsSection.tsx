"use client"

import Image from "next/image"
import Link from "next/link"
import { Container } from "../layout/Container"
import { Button } from "../atoms/Button"
import { cn } from "@/lib/utils"

export interface ProductsSectionProps {
  className?: string
}

export function ProductsSection({ className }: ProductsSectionProps) {
  return (
    <section className={cn("py-16 md:py-24 space-y-6 md:space-y-8", className)}>
      <Container>
        <div className="space-y-6 md:space-y-8">
          {/* ZX9 Speaker - Orange background with pattern */}
          <div className="relative bg-primary rounded-lg overflow-hidden">
            {/* Pattern circles background - Mobile centered */}
            <div
              className="absolute inset-0 z-0 bg-no-repeat bg-contain md:hidden"
              style={{
                backgroundImage:
                  "url(/images/home/desktop/pattern-circles.svg)",
                backgroundPosition: "center",
                width: "704px",
                height: "1044px",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
            {/* Pattern circles background - Tablet centered */}
            <div
              className="absolute inset-0 z-0 bg-no-repeat bg-contain hidden md:block lg:hidden"
              style={{
                backgroundImage:
                  "url(/images/home/desktop/pattern-circles.svg)",
                backgroundPosition: "center",
                width: "944px",
                height: "944px",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
            {/* Pattern circles background - Desktop left */}
            <div
              className="absolute z-0 bg-no-repeat hidden lg:block top-[0%] left-[20%]"
              style={{
                backgroundImage:
                  "url(/images/home/desktop/pattern-circles.svg)",
                backgroundSize: "944px 944px",
                width: "944px",
                height: "944px",
                left: "-11%",
                bottom: "0%",
              }}
            />

            <div className="max-w-7xl mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center py-12 md:py-16 lg:py-24 relative z-10">
                {/* Mobile/Tablet: Centered layout */}
                <div className="lg:hidden flex flex-col items-center text-center space-y-6 md:space-y-8 px-6 py-8 md:py-12">
                  {/* Product Image */}
                  <div className="relative w-full max-w-[172px] md:max-w-[200px] aspect-square">
                    <Image
                      src="/images/home/mobile/image-speaker-zx9.png"
                      alt="ZX9 Speaker"
                      fill
                      className="object-contain md:hidden"
                      priority
                    />
                    <Image
                      src="/images/home/tablet/image-speaker-zx9.png"
                      alt="ZX9 Speaker"
                      fill
                      className="hidden md:block lg:hidden object-contain"
                      priority
                    />
                  </div>

                  {/* Text Content */}
                  <div className="space-y-6 text-white">
                    <h2 className="text-[36px] md:text-[56px] font-bold leading-[40px] md:leading-[58px] tracking-[1.3px] md:tracking-[2px] uppercase">
                      ZX9
                      <br />
                      SPEAKER
                    </h2>
                    <p className="text-[15px] leading-[25px] opacity-75 max-w-[280px] md:max-w-[350px] mx-auto">
                      Upgrade to premium speakers that are phenomenally built to
                      deliver truly remarkable sound.
                    </p>
                    <div>
                      <Link href="/product/zx9-speaker">
                        <Button
                          variant="default"
                          className="bg-foreground hover:bg-foreground/90"
                        >
                          SEE PRODUCT
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Desktop: Two-column layout (image left, text right) */}
                <div className="hidden lg:flex items-center justify-center lg:justify-start">
                  <div className=" absolute w-full max-w-[415px] -bottom-3 left-[10%] aspect-square">
                    <Image
                      src="/images/home/desktop/image-speaker-zx9.png"
                      alt="ZX9 Speaker"
                      fill
                      className="object-contain"
                      priority
                      sizes="(min-width: 1024px) 410px, 0px"
                      quality={100}
                    />
                  </div>
                </div>

                <div className="hidden lg:flex flex-col items-start lg:ml-16 text-left space-y-8 text-white">
                  <h2 className="text-[56px] font-bold leading-[58px] tracking-[2px] uppercase">
                    ZX9
                    <br />
                    SPEAKER
                  </h2>
                  <p className="text-[15px] leading-[25px] opacity-75 max-w-[350px]">
                    Upgrade to premium speakers that are phenomenally built to
                    deliver truly remarkable sound.
                  </p>
                  <div>
                    <Link href="/product/zx9-speaker">
                      <Button
                        variant="default"
                        className="bg-foreground hover:bg-foreground/90"
                      >
                        SEE PRODUCT
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ZX7 Speaker - Full image background with overlay text */}
          <div className="relative rounded-lg overflow-hidden min-h-[320px] md:min-h-[400px] lg:min-h-[320px]">
            {/* Background Image - Full coverage */}
            <div className="absolute inset-0">
              <Image
                src="/images/home/mobile/image-speaker-zx7.jpg"
                alt="ZX7 Speaker"
                fill
                className="object-cover object-center md:hidden"
                quality={100}
                sizes="100vw"
              />
              <Image
                src="/images/home/tablet/image-speaker-zx7.jpg"
                alt="ZX7 Speaker"
                fill
                className="hidden md:block lg:hidden object-cover object-center"
                quality={100}
                sizes="100vw"
              />
              <Image
                src="/images/home/desktop/image-speaker-zx7.jpg"
                alt="ZX7 Speaker"
                fill
                className="hidden lg:block object-cover object-center"
                sizes="100vw"
                quality={100}
              />
            </div>

            {/* Text Content Overlay - Left aligned on all views */}
            <div className="relative z-10 flex flex-col items-start justify-center space-y-8 px-6 md:px-10 lg:px-16 py-16 md:py-20 lg:py-24 min-h-[320px] md:min-h-[400px] lg:min-h-[320px]">
              <h2 className="text-[28px] md:text-[40px] font-bold leading-[32px] md:leading-[44px] tracking-[2px] uppercase text-foreground text-left">
                ZX7 SPEAKER
              </h2>
              <div className="flex justify-start">
                <Link href="/product/zx7-speaker">
                  <Button
                    variant="outline"
                    className="border-foreground bg-transparent hover:bg-foreground hover:text-background"
                  >
                    SEE PRODUCT
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* YX1 Earphones - Two cards side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-3 lg:gap-8">
            {/* Image Card - Left side, full image background */}
            <div className="relative w-full rounded-lg overflow-hidden">
              <Image
                src="/images/home/mobile/image-earphones-yx1.jpg"
                alt="YX1 Earphones"
                width={654}
                height={654}
                className="w-full h-auto object-cover object-center md:hidden"
                quality={100}
              />
              <Image
                src="/images/home/tablet/image-earphones-yx1.jpg"
                alt="YX1 Earphones"
                width={1378}
                height={704}
                className="hidden md:block lg:hidden w-full h-auto object-cover object-center"
                quality={100}
              />
              <Image
                src="/images/home/desktop/image-earphones-yx1.jpg"
                alt="YX1 Earphones"
                width={1378}
                height={704}
                className="hidden lg:block w-full h-auto object-cover object-center"
                quality={100}
              />
            </div>

            {/* Text Card - Right side, light gray background */}
            <div className="flex flex-col items-center md:items-start justify-center text-center md:text-left space-y-8 bg-muted rounded-lg px-6 md:px-10 lg:px-16 py-16 md:py-20">
              <h2 className="text-[28px] md:text-[40px] font-bold leading-8 md:leading-[44px] tracking-[2px] uppercase text-foreground">
                YX1 EARPHONES
              </h2>
              <div>
                <Link href="/product/yx1-earphones">
                  <Button variant="outline" className="border-foreground">
                    SEE PRODUCT
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

