"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "../atoms/Button"
import { TextField } from "../molecules/TextField"
import { RadioGroup, RadioGroupItem, RadioGroupCard } from "../molecules/RadioGroup"
import { Label } from "../atoms/Label"
import { Container } from "../layout/Container"

// Static cart items (same as cart modal)
const checkoutItems = [
  {
    id: "xx99-mark-two",
    slug: "xx99-mark-two-headphones",
    name: "XX99 MK II",
    price: 2999,
    quantity: 1,
    image: "/images/shared/desktop/image-xx99-mark-two-headphones.jpg",
    imageAlt: "XX99 Mark II Headphones",
  },
  {
    id: "xx59",
    slug: "xx59-headphones",
    name: "XX59",
    price: 899,
    quantity: 2,
    image: "/images/shared/desktop/image-xx59-headphones.jpg",
    imageAlt: "XX59 Headphones",
  },
  {
    id: "yx1",
    slug: "yx1-earphones",
    name: "YX1",
    price: 599,
    quantity: 1,
    image: "/images/cart/image-yx1-earphones.jpg",
    imageAlt: "YX1 Earphones",
  },
]

export function CheckoutForm() {
  const [paymentMethod, setPaymentMethod] = useState("e-money")

  // Calculate totals
  const subtotal = checkoutItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const shipping = 50
  const vat = Math.round(subtotal * 0.2) // 20% VAT
  const grandTotal = subtotal + shipping

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="py-6 md:py-12 lg:py-16">
      <Container>
        {/* Go Back Link */}
        <Link
          href="/"
          className="inline-block text-[15px] leading-[25px] text-foreground/50 hover:text-primary transition-colors mb-6 md:mb-8"
        >
          Go Back
        </Link>

        {/* Main Content - Two Column Layout on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 lg:gap-8">
          {/* Left Column - Checkout Form */}
          <div className="bg-white rounded-lg p-6 md:p-8 lg:p-12">
            <h1 className="text-[28px] md:text-[32px] lg:text-[40px] font-bold uppercase tracking-[1px] md:tracking-[1.4px] text-foreground mb-8 md:mb-10">
              CHECKOUT
            </h1>

            {/* BILLING DETAILS */}
            <section className="mb-10 md:mb-12">
              <h2 className="text-[13px] font-bold uppercase tracking-[0.9px] text-primary mb-4 md:mb-6">
                BILLING DETAILS
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="md:col-span-1">
                  <TextField
                    label="Name"
                    type="text"
                    defaultValue="Alexei Ward"
                    placeholder="Alexei Ward"
                  />
                </div>
                <div className="md:col-span-1">
                  <TextField
                    label="Email Address"
                    type="email"
                    defaultValue="alexeiward@mail.com"
                    placeholder="alexeiward@mail.com"
                  />
                </div>
                <div className="md:col-span-2">
                  <TextField
                    label="Phone Number"
                    type="tel"
                    defaultValue="+1 202-555-0136"
                    placeholder="+1 202-555-0136"
                  />
                </div>
              </div>
            </section>

            {/* SHIPPING INFO */}
            <section className="mb-10 md:mb-12">
              <h2 className="text-[13px] font-bold uppercase tracking-[0.9px] text-primary mb-4 md:mb-6">
                SHIPPING INFO
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="md:col-span-2">
                  <TextField
                    label="Your Address"
                    type="text"
                    defaultValue="1137 Williams Avenue"
                    placeholder="1137 Williams Avenue"
                  />
                </div>
                <div className="md:col-span-1">
                  <TextField
                    label="ZIP Code"
                    type="text"
                    defaultValue="10001"
                    placeholder="10001"
                  />
                </div>
                <div className="md:col-span-1">
                  <TextField
                    label="City"
                    type="text"
                    defaultValue="New York"
                    placeholder="New York"
                  />
                </div>
                <div className="md:col-span-2">
                  <TextField
                    label="Country"
                    type="text"
                    defaultValue="United States"
                    placeholder="United States"
                  />
                </div>
              </div>
            </section>

            {/* PAYMENT DETAILS */}
            <section>
              <h2 className="text-[13px] font-bold uppercase tracking-[0.9px] text-primary mb-4 md:mb-6">
                PAYMENT DETAILS
              </h2>
              <div className="space-y-6">
                {/* Payment Method */}
                <div>
                  <Label className="mb-4 block text-[12px] font-bold">
                    Payment Method
                  </Label>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="space-y-3"
                  >
                    <RadioGroupCard checked={paymentMethod === "e-money"}>
                      <RadioGroupItem value="e-money" id="e-money" />
                      <Label htmlFor="e-money" className="font-medium cursor-pointer">
                        e-Money
                      </Label>
                    </RadioGroupCard>
                    <RadioGroupCard checked={paymentMethod === "cash"}>
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="font-medium cursor-pointer">
                        Cash on Delivery
                      </Label>
                    </RadioGroupCard>
                  </RadioGroup>
                </div>

                {/* e-Money Fields - Only show if e-Money is selected */}
                {paymentMethod === "e-money" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="md:col-span-1">
                      <TextField
                        label="e-Money Number"
                        type="text"
                        defaultValue="238521993"
                        placeholder="238521993"
                      />
                    </div>
                    <div className="md:col-span-1">
                      <TextField
                        label="e-Money PIN"
                        type="text"
                        defaultValue="6891"
                        placeholder="6891"
                      />
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <div className="bg-white rounded-lg p-6 md:p-8">
              <h2 className="text-[18px] md:text-[24px] font-bold uppercase tracking-[1.3px] text-foreground mb-6 md:mb-8">
                SUMMARY
              </h2>

              {/* Cart Items */}
              <div className="space-y-6 mb-8">
                {checkoutItems.map((item) => (
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
              </div>

              {/* Totals */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-[15px] uppercase text-foreground/50">TOTAL</span>
                  <span className="text-[18px] font-bold text-foreground">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[15px] uppercase text-foreground/50">SHIPPING</span>
                  <span className="text-[18px] font-bold text-foreground">
                    {formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[15px] uppercase text-foreground/50">VAT (INCLUDED)</span>
                  <span className="text-[18px] font-bold text-foreground">
                    {formatPrice(vat)}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[15px] uppercase text-foreground/50">GRAND TOTAL</span>
                  <span className="text-[18px] font-bold text-primary">
                    {formatPrice(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Continue & Pay Button */}
              <Button
                variant="default"
                size="default"
                className="w-full"
                asChild
              >
                <Link href="/">CONTINUE & PAY</Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

