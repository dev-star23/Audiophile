"use client"

import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Container } from "./Container"
import { cn } from "@/lib/utils"

interface MobileMenuProps {
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

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
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
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Modal */}
      <div
        className={cn(
          "fixed inset-x-0 top-0 bottom-0 z-50 md:hidden",
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
          <Container className="py-8">
            {/* Category Cards - Mobile only (vertical stack) */}
            <div className="flex flex-col pt-18 gap-18">
              {categories.map((category) => (
                 <Link
                   key={category.href}
                   href={category.href}
                   onClick={onClose}
                   className={cn(
                     "group relative flex-1 max-w-full",
                     "bg-muted rounded-lg",
                     "flex flex-col items-center text-center",
                     "pt-14 pb-7",
                     "transition-all hover:scale-[1.02] active:scale-[0.98]",
                     "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                   )}
                 >
                   {/* Product Image - Absolute positioned to float above */}
                   <div
                     className="absolute"
                     style={{
                       top: '15px',
                       left: '50%',
                       transform: 'translateX(-50%) translateY(-110px)',
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
                         width: '260px',
                         height: '280px',
                         display: 'block',
                       }}
                     />
                   </div>

                  {/* Category Name */}
                  <h3 className="text-[15px] font-bold uppercase tracking-[1px] mb-3 text-foreground mt-[72px]">
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

