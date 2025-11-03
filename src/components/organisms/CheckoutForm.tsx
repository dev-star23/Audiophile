"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "../atoms/Button"
import { TextField } from "../molecules/TextField"
import { RadioGroup, RadioGroupItem, RadioGroupCard } from "../molecules/RadioGroup"
import { Label } from "../atoms/Label"
import { Container } from "../layout/Container"
import { NumberInput } from "../atoms/NumberInput"
import { useCart } from "@/context/CartContext"
import { ConfirmationModal } from "./ConfirmationModal"

// Form validation schema
const checkoutSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Wrong format"),
  phone: z.string().min(5, "Phone number must be at least 5 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  zipCode: z.string().min(3, "ZIP code must be at least 3 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
  paymentMethod: z.enum(["e-money", "cash"]),
  eMoneyNumber: z.string().optional(),
  eMoneyPIN: z.string().optional(),
}).refine((data) => {
  if (data.paymentMethod === "e-money") {
    return data.eMoneyNumber && data.eMoneyNumber.length >= 9
  }
  return true
}, {
  message: "e-Money number must be at least 9 digits",
  path: ["eMoneyNumber"],
}).refine((data) => {
  if (data.paymentMethod === "e-money") {
    return data.eMoneyPIN && data.eMoneyPIN.length >= 4
  }
  return true
}, {
  message: "e-Money PIN must be at least 4 digits",
  path: ["eMoneyPIN"],
})

type CheckoutFormData = z.infer<typeof checkoutSchema>

export function CheckoutForm() {
  const router = useRouter()
  const { items, updateQuantity, removeAll } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [orderNumber, setOrderNumber] = useState<string>()
  const [orderItems, setOrderItems] = useState<typeof items>([])

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: "e-money",
    },
  })

  const paymentMethod = watch("paymentMethod")

  const handleClearCart = () => {
    removeAll()
    router.push("/")
  }

  // Calculate totals
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const shipping = 50
  const vat = Math.round(subtotal * 0.15) // 15% VAT
  const grandTotal = subtotal + shipping

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true)

    try {
      // Prepare order data
      const orderData = {
        ...data,
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          imageAlt: item.imageAlt,
        })),
        subtotal,
        shipping,
        vat,
        grandTotal,
      }

      // Send confirmation email
      const response = await fetch("/api/send-confirmation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        throw new Error("Failed to send confirmation email")
      }

      const result = await response.json()
      setOrderNumber(result.orderNumber)

      // Save items for confirmation modal before clearing cart
      setOrderItems([...items])

      // Clear cart
      removeAll()

      // Show confirmation modal
      setShowConfirmation(true)
    } catch (error) {
      console.error("Error submitting order:", error)
      alert("Failed to submit order. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle empty cart
  if (items.length === 0 && !showConfirmation && orderItems.length === 0) {
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

          {/* Empty Cart State */}
          <div className="bg-white rounded-lg p-6 md:p-8 lg:p-12 text-center">
            <h1 className="text-[28px] md:text-[32px] lg:text-[40px] font-bold uppercase tracking-[1px] md:tracking-[1.4px] text-foreground mb-6 md:mb-8">
              CHECKOUT
            </h1>
            <div className="py-12 md:py-16 space-y-6">
              <p className="text-[15px] leading-[25px] text-foreground/75">
                Your cart is empty
              </p>
              <Button asChild variant="default" size="default">
                <Link href="/">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <>
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 lg:gap-8"
          >
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
                      placeholder="Alexei Ward"
                      error={errors.name?.message}
                      {...register("name")}
                    />
                  </div>
                  <div className="md:col-span-1">
                    <TextField
                      label="Email Address"
                      type="email"
                      placeholder="alexeiward@mail.com"
                      error={errors.email?.message}
                      {...register("email")}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <TextField
                      label="Phone Number"
                      type="tel"
                      placeholder="+1 202-555-0136"
                      error={errors.phone?.message}
                      {...register("phone")}
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
                      placeholder="1137 Williams Avenue"
                      error={errors.address?.message}
                      {...register("address")}
                    />
                  </div>
                  <div className="md:col-span-1">
                    <TextField
                      label="ZIP Code"
                      type="text"
                      placeholder="10001"
                      error={errors.zipCode?.message}
                      {...register("zipCode")}
                    />
                  </div>
                  <div className="md:col-span-1">
                    <TextField
                      label="City"
                      type="text"
                      placeholder="New York"
                      error={errors.city?.message}
                      {...register("city")}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <TextField
                      label="Country"
                      type="text"
                      placeholder="United States"
                      error={errors.country?.message}
                      {...register("country")}
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
                      onValueChange={(value) => {
                        setValue("paymentMethod", value as "e-money" | "cash")
                      }}
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
                          placeholder="238521993"
                          error={errors.eMoneyNumber?.message}
                          {...register("eMoneyNumber")}
                        />
                      </div>
                      <div className="md:col-span-1">
                        <TextField
                          label="e-Money PIN"
                          type="text"
                          placeholder="6891"
                          error={errors.eMoneyPIN?.message}
                          {...register("eMoneyPIN")}
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
                <div className="flex items-center justify-between mb-6 md:mb-8">
                  <h2 className="text-[18px] md:text-[24px] font-bold uppercase tracking-[1.3px] text-foreground">
                    SUMMARY
                  </h2>
                  <button
                    type="button"
                    onClick={handleClearCart}
                    className="text-[15px] leading-[25px] text-foreground/50 hover:text-primary underline transition-colors"
                  >
                    Remove all
                  </button>
                </div>

                {/* Cart Items */}
                <div className="space-y-6 mb-8">
                  {items.map((item) => (
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

                      {/* Quantity Controls */}
                      <div className="shrink-0">
                        <NumberInput
                          value={item.quantity}
                          onChange={(e) => {
                            const newQuantity = Number(e.target.value) || 1
                            updateQuantity(item.id, newQuantity)
                          }}
                          min={1}
                          className="w-24"
                        />
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
                    <span className="text-[15px] uppercase text-foreground/50">VAT (15% INCLUDED)</span>
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
                  type="submit"
                  variant="default"
                  size="default"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "PROCESSING..." : "CONTINUE & PAY"}
                </Button>
              </div>
            </div>
          </form>
        </Container>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => {
          setShowConfirmation(false)
          router.push("/")
        }}
        items={orderItems}
        grandTotal={grandTotal}
        orderNumber={orderNumber}
      />
    </>
  )
}
