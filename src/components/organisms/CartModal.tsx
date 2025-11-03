"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../atoms/Button"
import { NumberInput } from "../atoms/NumberInput"
import { cn } from "@/lib/utils"
import type { CartItem } from "@/context/CartContext"

export interface CartModalProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onRemoveAll?: () => void
  onUpdateQuantity?: (id: string, quantity: number) => void
}

export function CartModal({
  isOpen,
  onClose,
  items,
  onRemoveAll,
  onUpdateQuantity,
}: CartModalProps) {

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

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <>
      {/* Backdrop/Overlay - All screen sizes */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Cart Modal */}
      <div
        className={cn(
          "fixed z-50 bg-white rounded-lg shadow-lg",
          // Mobile: Centered, takes most of screen width
          "top-[90px] left-4 right-4 max-h-[calc(100vh-120px)] overflow-y-auto",
          // Desktop: Right side, positioned below navbar
          "md:top-[90px] md:right-12 md:left-auto md:w-[377px] md:max-h-[calc(100vh-120px)]",
          "animate-in slide-in-from-top-2 duration-200"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-bold uppercase tracking-[1.3px] text-foreground">
            CART ({totalItems})
          </h2>
          {onRemoveAll && items.length > 0 && (
            <button
              onClick={onRemoveAll}
              className="text-[15px] leading-[25px] text-foreground/50 hover:text-primary underline transition-colors"
            >
              Remove all
            </button>
          )}
        </div>

        {/* Cart Items */}
        <div className="p-6 space-y-6 max-h-[300px] overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-[15px] leading-[25px] text-foreground/75 text-center py-8">
              Your cart is empty
            </p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                {/* Product Image */}
                <div className="relative w-16 h-16 rounded-lg bg-muted overflow-hidden shrink-0">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="object-contain p-2"
                    sizes="64px"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-[15px] font-bold leading-[25px] text-foreground truncate">
                    {item.name}
                  </h3>
                  <p className="text-[14px] leading-[25px] text-foreground/50">
                    {formatPrice(item.price)}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="shrink-0">
                  <NumberInput
                    value={item.quantity}
                    onChange={(e) => {
                      const newQuantity = Number(e.target.value) || 1
                      onUpdateQuantity?.(item.id, newQuantity)
                    }}
                    min={1}
                    className="w-24"
                  />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Total */}
        {items.length > 0 && (
          <>
            <div className="px-6 pb-6 flex items-center justify-between border-t border-border pt-4">
              <span className="text-[15px] uppercase text-foreground/50">TOTAL</span>
              <span className="text-lg font-bold text-foreground">
                {formatPrice(totalPrice)}
              </span>
            </div>

            {/* Checkout Button */}
            <div className="px-6 pb-6">
              <Button
                asChild
                variant="default"
                size="default"
                className="w-full"
                onClick={onClose}
              >
                <Link href="/checkout">CHECKOUT</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  )
}

