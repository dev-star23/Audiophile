"use client"

import Link from "next/link"
import Image from "next/image"
import { Container } from "../layout/Container"
import { cn } from "@/lib/utils"

export interface FooterProps {
  className?: string
}

const navigationLinks = [
  { label: "HOME", href: "/" },
  { label: "HEADPHONES", href: "/headphones" },
  { label: "SPEAKERS", href: "/speakers" },
  { label: "EARPHONES", href: "/earphones" },
]

const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: "/images/shared/desktop/icon-facebook.svg",
  },
  {
    name: "Twitter",
    href: "https://twitter.com",
    icon: "/images/shared/desktop/icon-twitter.svg",
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: "/images/shared/desktop/icon-instagram.svg",
  },
]

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("bg-foreground text-white mt-24 md:mt-32 relative", className)}>
      {/* Orange line at footer top border */}
      {/* Mobile: centered, Larger screens: left-aligned */}
      <Container className="relative">
        <div className="absolute top-0 left-1/2 md:left-12 -translate-x-1/2 md:translate-x-0 h-1 bg-primary w-[101px]" />
      </Container>
      
      <Container>
        <div className="pt-12 md:pt-16 pb-12 md:pb-16 space-y-12 md:space-y-8">
          {/* Top section: Logo and Navigation */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-0">
            {/* Logo */}
            <Link
              href="/"
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

            {/* Navigation Links */}
            <nav aria-label="Footer navigation">
              <ul className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
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
            </nav>
          </div>

          {/* Middle section: About text */}
          <div className="max-w-[540px] lg:max-w-[435px] xl:max-w-[545px]">
            <p className="text-[15px] leading-[25px] text-white/50">
              Audiophile is an all in one stop to fulfill your audio needs. We&apos;re a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we&apos;re open 7 days a week.
            </p>
          </div>

          {/* Bottom section: Copyright and Social Icons */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-0 pt-8 md:pt-4 border-t border-white/10">
            {/* Copyright */}
            <p className="text-[15px] leading-[25px] text-white/50">
              Copyright {new Date().getFullYear()}. All Rights Reserved ❤️ K.S
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative transition-all"
                  aria-label={`Visit our ${social.name} page`}
                >
                  <Image
                    src={social.icon}
                    alt={social.name}
                    width={24}
                    height={24}
                    className="h-6 w-6 transition-all"
                  />
                  <Image
                    src={social.icon}
                    alt=""
                    width={24}
                    height={24}
                    className="h-6 w-6 absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      filter: 'brightness(0) saturate(100%) invert(67%) sepia(62%) saturate(1752%) hue-rotate(340deg) brightness(108%) contrast(89%)',
                    }}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}

