"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Container } from "../layout/Container"
import { MobileMenu } from "./MobileMenu"
import { TabletMenu } from "./TabletMenu"
import { CartModal } from "./CartModal"
import { useCart } from "@/context/CartContext"

const navigationLinks = [
  { label: "HOME", href: "/" },
  { label: "HEADPHONES", href: "/headphones" },
  { label: "SPEAKERS", href: "/speakers" },
  { label: "EARPHONES", href: "/earphones" },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { items, updateQuantity, removeAll, totalItems } = useCart()

  const toggleMenu = () => setIsMenuOpen((prev) => !prev)
  const closeMenu = () => setIsMenuOpen(false)
  const toggleCart = () => setIsCartOpen((prev) => !prev)
  const closeCart = () => setIsCartOpen(false)

  return (
    <>
      <nav
        className="bg-foreground text-white"
        role="navigation"
        aria-label="Main navigation"
      >
        <Container>
          <div className="flex items-center justify-between h-[90px]">
            {/* Hamburger Menu Button - Mobile & Tablet */}
            <button
              onClick={toggleMenu}
              className="lg:hidden flex items-center justify-center hover:opacity-70 transition-opacity"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
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
              className="flex items-center ml-4 md:ml-0"
              aria-label="audiophile home"
            >
              <Image
                src="/images/logo.svg"
                alt="audiophile"
                width={143}
                height={25}
                className="h-6 w-auto"
                priority
              />
            </Link>

            {/* Navigation Links - Desktop Only */}
            <ul className="hidden lg:flex items-center gap-[34px]">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-bold tracking-[2px] uppercase hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Cart Icon */}
            <button
              onClick={toggleCart}
              className="flex items-center hover:opacity-70 transition-opacity cursor-pointer relative"
              aria-label="Shopping cart"
              aria-expanded={isCartOpen}
            >
              <Image
                src="/images/shared/desktop/icon-cart.svg"
                alt=""
                width={23}
                height={20}
                className="h-5 w-auto"
              />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
          <hr className=" opacity-10 hidden lg:block" />
        </Container>
      </nav>

      {/* Mobile Menu Modal */}
      <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />

      {/* Tablet Menu Modal */}
      <TabletMenu isOpen={isMenuOpen} onClose={closeMenu} />

      {/* Cart Modal */}
      <CartModal 
        isOpen={isCartOpen} 
        onClose={closeCart}
        items={items}
        onRemoveAll={removeAll}
        onUpdateQuantity={updateQuantity}
      />
    </>
  );
}
