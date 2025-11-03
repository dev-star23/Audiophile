"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../atoms/Button"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import type { CartItem } from "@/context/CartContext"

export interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  grandTotal: number
  orderNumber?: string
}

export function ConfirmationModal({
  isOpen,
  onClose,
  items,
  grandTotal,
}: ConfirmationModalProps) {
  const confettiRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!isOpen || !confettiRef.current) return

    const canvas = confettiRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
    }
    setCanvasSize()

    // Update canvas size on resize
    const handleResize = () => setCanvasSize()
    window.addEventListener("resize", handleResize)

    // Confetti particles with better physics
    interface Particle {
      x: number
      y: number
      vx: number
      vy: number
      rotation: number
      rotationSpeed: number
      color: string
      size: number
      shape: "circle" | "rectangle"
      opacity: number
    }

    const particles: Particle[] = []
    const colors = ["#D87D4A", "#FBAF85", "#101010", "#FFFFFF", "#F1F1F1"]
    const particleCount = 150

    // Create particles with varied properties
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: -20 - Math.random() * 100, // Start above viewport
        vx: (Math.random() - 0.5) * 4, // Horizontal velocity
        vy: Math.random() * 3 + 1, // Initial vertical velocity
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 6 + 3,
        shape: Math.random() > 0.5 ? "circle" : "rectangle",
        opacity: 0.8 + Math.random() * 0.2,
      })
    }

    let animationId: number
    const gravity = 0.15
    const friction = 0.99
    const startTime = Date.now()
    const duration = 4000 // 4 seconds

    const animate = () => {
      const currentTime = Date.now()
      const elapsed = currentTime - startTime

      // Fade out over time
      const fadeOutStart = duration * 0.7
      const fadeProgress = elapsed > fadeOutStart ? (elapsed - fadeOutStart) / (duration - fadeOutStart) : 0

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i]

        // Update physics
        particle.x += particle.vx
        particle.y += particle.vy
        particle.vy += gravity // Gravity
        particle.vx *= friction // Air resistance
        particle.rotation += particle.rotationSpeed

        // Calculate opacity with fade out
        const currentOpacity = particle.opacity * (1 - fadeProgress)

        // Draw particle
        ctx.save()
        ctx.translate(particle.x, particle.y)
        ctx.rotate(particle.rotation)
        ctx.globalAlpha = currentOpacity
        ctx.fillStyle = particle.color

        if (particle.shape === "circle") {
          ctx.beginPath()
          ctx.arc(0, 0, particle.size, 0, Math.PI * 2)
          ctx.fill()
        } else {
          // Rectangle (confetti piece)
          const width = particle.size * 1.5
          const height = particle.size * 0.8
          ctx.fillRect(-width / 2, -height / 2, width, height)
        }

        ctx.restore()

        // Reset if off screen (wrap around from top)
        if (particle.y > window.innerHeight + 50) {
          particle.y = -20
          particle.x = Math.random() * window.innerWidth
          particle.vy = Math.random() * 3 + 1
          particle.vx = (Math.random() - 0.5) * 4
        }
      }

      // Stop after duration
      if (elapsed < duration) {
        animationId = requestAnimationFrame(animate)
      } else {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      }
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const visibleItems = items.slice(0, 1)
  const otherItemsCount = items.length - 1

  return (
    <>
      {/* Confetti Canvas */}
      <canvas
        ref={confettiRef}
        className="fixed inset-0 pointer-events-none z-60"
      />

      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className={cn(
          "fixed z-60 bg-white rounded-lg shadow-lg",
          "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "w-[calc(100%-32px)] max-w-[540px] max-h-[calc(100vh-32px)] overflow-y-auto",
          "animate-in fade-in-0 zoom-in-95 duration-200"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Order confirmation"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 md:p-8 lg:p-12">
          {/* Success Icon */}
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary flex items-center justify-center">
              <Check className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-[24px] md:text-[32px] font-bold uppercase tracking-[0.86px] md:tracking-[1.14px] text-foreground mb-4 text-center">
            THANK YOU FOR YOUR ORDER
          </h2>

          {/* Subtitle */}
          <p className="text-[15px] leading-[25px] text-foreground/50 text-center mb-6">
            You will receive an email confirmation shortly.
          </p>

          {/* Order Summary */}
          <div className="rounded-lg overflow-hidden mb-6">
            {/* Items Section */}
            <div className="bg-muted p-4 md:p-6">
              <div className="space-y-4">
                {visibleItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    {/* Product Image */}
                    <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-lg bg-white overflow-hidden shrink-0">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        className="object-contain p-1"
                        sizes="64px"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[15px] font-bold leading-[25px] text-foreground">
                        {item.name}
                      </h3>
                      <p className="text-[14px] leading-[25px] text-foreground/50">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    {/* Quantity */}
                    <div className="text-[15px] font-bold text-foreground/50">
                      x{item.quantity}
                    </div>
                  </div>
                ))}

                {otherItemsCount > 0 && (
                  <div className="pt-4 border-t border-border/50">
                    <p className="text-[12px] font-bold leading-4 text-foreground/50 text-center">
                      and {otherItemsCount} other item{otherItemsCount > 1 ? "s" : ""}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Grand Total */}
            <div className="bg-foreground p-4 md:p-6 rounded-b-lg">
              <div className="flex items-center justify-between">
                <span className="text-[15px] uppercase text-white/75">
                  GRAND TOTAL
                </span>
                <span className="text-[18px] md:text-[20px] font-bold text-white">
                  {formatPrice(grandTotal)}
                </span>
              </div>
            </div>
          </div>

          {/* Back to Home Button */}
          <Button
            variant="default"
            size="default"
            className="w-full"
            onClick={onClose}
            asChild
          >
            <Link href="/">BACK TO HOME</Link>
          </Button>
        </div>
      </div>
    </>
  )
}

