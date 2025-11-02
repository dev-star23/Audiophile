"use client"

import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Container } from "../layout/Container"
import { cn } from "@/lib/utils"

interface TabletMenuProps {
  isOpen: boolean
  onClose: () => void
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

export function TabletMenu({ isOpen, onClose }: TabletMenuProps) {
  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop/Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 hidden md:block lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Modal */}
      <div
        className={cn(
          "fixed inset-x-0 top-0 bottom-0 z-50 hidden md:block lg:hidden",
          "bg-white overflow-y-auto",
          "animate-in slide-in-from-top-0 duration-200"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Header */}
        <header className="bg-foreground text-white">
          <Container>
            <div className="flex items-center justify-between h-[90px]">
              {/* Hamburger Menu Icon (Close) */}
              <button
                onClick={onClose}
                className="flex items-center justify-center hover:opacity-70 transition-opacity"
                aria-label="Close menu"
              >
                <Image
                  src="/images/hamburger.svg"
                  alt=""
                  width={16}
                  height={15}
                  className="h-4 w-auto"
                />
              </button>

              {/* Logo */}
              <Link
                href="/"
                onClick={onClose}
                className="flex items-center"
                aria-label="audiophile home"
              >
                <Image
                  src="/images/logo.svg"
                  alt="audiophile"
                  width={143}
                  height={25}
                  className="h-6 w-auto"
                />
              </Link>

              {/* Cart Icon */}
              <Link
                href="/cart"
                onClick={onClose}
                className="flex items-center hover:opacity-70 transition-opacity"
                aria-label="Shopping cart"
              >
                <Image
                  src="/images/shared/desktop/icon-cart.svg"
                  alt=""
                  width={23}
                  height={20}
                  className="h-5 w-auto"
                />
              </Link>
            </div>
          </Container>
        </header>

        {/* Menu Content */}
        <div className="bg-white min-h-[calc(100vh-90px)]">
          <Container className="py-12">
            {/* Category Cards - Horizontal layout for tablet */}
            <div className="flex flex-row gap-3 justify-center">
              {categories.map((category) => (
                <Link
                  key={category.href}
                  href={category.href}
                  onClick={onClose}
                  className={cn(
                    "group relative flex-1",
                    "bg-muted rounded-lg",
                    "flex flex-col items-center text-center",
                    "pt-10 pb-[25px] mt-[50.4px]",
                    "overflow-visible",
                    "transition-all hover:scale-[1.02] active:scale-[0.98]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  )}
                >
                  {/* Product Image - Absolute positioned to float above (doesn't affect card size) */}
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      top: '-25px',
                      left: '50%',
                      marginTop: '1.5px',
                      transform: 'translateX(-50%) translateY(-127px)',
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
                        width: '300px',
                        height: '370px',
                        display: 'block',
                      }}
                    />
                  </div>

                  {/* Category Name */}
                  <h3 className="text-lg font-bold uppercase tracking-wider mb-3 text-foreground mt-[64px]">
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
        </div>
      </div>
    </>
  )
}

