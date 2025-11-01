"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Button,
  TextField,
  FormField,
  PageSection,
  Container,
  RadioOption,
  RadioGroup,
  Form,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  NumberInput,
} from "@/components"

const formSchema = z.object({
  email: z.string().email({
    message: "Wrong format",
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
})

export default function DesignSystemPage() {
  const [radioValue, setRadioValue] = useState("e-money")
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  const colors = [
    { name: "Orange-Brown", tailwindClass: "orange-brown", hex: "#D87D4A", rgb: "216, 125, 74", hsl: "22°, 65%, 57%" },
    { name: "Light Orange", tailwindClass: "light-orange", hex: "#FBAF85", rgb: "251, 175, 133", hsl: "21°, 94%, 75%" },
    { name: "Light Gray", tailwindClass: "light-gray", hex: "#F1F1F1", rgb: "241, 241, 241", hsl: "0°, 0%, 95%" },
    { name: "Very Light Gray", tailwindClass: "very-light-gray", hex: "#FAFAFA", rgb: "250, 250, 250", hsl: "0°, 0%, 98%" },
    { name: "Pure Black", tailwindClass: "pure-black", hex: "#000000", rgb: "0, 0, 0", hsl: "0°, 0%, 0%" },
    { name: "Black", tailwindClass: "foreground", hex: "#101010", rgb: "16, 16, 16", hsl: "0°, 0%, 6%" },
    { name: "White", tailwindClass: "background", hex: "#FFFFFF", rgb: "255, 255, 255", hsl: "0°, 0%, 100%" },
  ]

  const typography = [
    { name: "H1", size: "56px", line: "58px", spacing: "2px", weight: "Bold", example: "MORBI INTERDUM MOLLIS SAPIEN" },
    { name: "H2", size: "40px", line: "44px", spacing: "1.5px", weight: "Bold", example: "DONEC NEC JUSTO EGET FELIS FACILISIS" },
    { name: "H3", size: "32px", line: "36px", spacing: "1.15px", weight: "Bold", example: "NUNC SEM LACUS ACCUM" },
    { name: "H4", size: "28px", line: "38px", spacing: "2px", weight: "Bold", example: "INTERDUM CONSECTETUER" },
    { name: "H5", size: "24px", line: "33px", spacing: "1.7px", weight: "Bold", example: "NASCETUR RIDICULUS MUS" },
    { name: "H6", size: "18px", line: "24px", spacing: "1.3px", weight: "Bold", example: "NATOQUE PENATIBUS ET" },
    { name: "Overline", size: "14px", line: "19px", spacing: "10px", weight: "Regular", example: "LOREM IPSUM" },
    { name: "Sub Title", size: "13px", line: "25px", spacing: "1px", weight: "Bold", example: "FUSCE UT EST SED DOLOR GRAVIDA CONVALLIS" },
    { name: "Body", size: "15px", line: "25px", spacing: "0px", weight: "Medium", example: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Container maxWidth="2xl" className="py-12 space-y-16">
        {/* Header */}
        <div className="space-y-2 border-b border-border pb-8">
          <h1>DESIGN SYSTEM</h1>
          <p className="text-body text-muted-foreground">
            Audiophile Ecommerce Design System - Built with shadcn/ui, React Hook Form, and Zod
          </p>
        </div>

        {/* 01 COLORS */}
        <PageSection sectionNumber="01 COLORS">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colors.map((color) => {
              // Map tailwind class names to actual Tailwind classes
              const bgClass = color.tailwindClass === "orange-brown" ? "bg-orange-brown" :
                            color.tailwindClass === "light-orange" ? "bg-light-orange" :
                            color.tailwindClass === "light-gray" ? "bg-light-gray" :
                            color.tailwindClass === "very-light-gray" ? "bg-very-light-gray" :
                            color.tailwindClass === "pure-black" ? "bg-pure-black" :
                            color.tailwindClass === "foreground" ? "bg-foreground" :
                            "bg-background"
              
              return (
                <div key={color.name} className="space-y-3">
                  <div
                    className={`h-32 rounded-lg border border-border shadow-sm ${bgClass}`}
                  />
                  <div className="space-y-1">
                    <p className="font-bold text-sm">{color.name}</p>
                    <div className="text-xs font-mono text-muted-foreground space-y-0.5">
                      <p>Class: <code className="text-primary">bg-{color.tailwindClass}</code></p>
                      <p>HEX: {color.hex}</p>
                      <p>RGB: {color.rgb}</p>
                      <p>HSL: {color.hsl}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </PageSection>

        {/* 02 TYPOGRAPHY */}
        <PageSection
          sectionNumber="02 TYPOGRAPHY"
          description="Manrope Typeface"
        >
          <Card>
            <CardContent className="pt-6 space-y-8">
              {typography.map((type) => (
                <div key={type.name} className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      {type.name}
                    </p>
                    <div className="text-xs text-muted-foreground font-mono">
                      {type.size} / {type.line} / {type.spacing} / {type.weight}
                    </div>
                  </div>
                  <p
                    style={{
                      fontSize: type.size,
                      lineHeight: type.line,
                      letterSpacing: `${type.spacing}px`,
                      fontWeight: type.weight === "Bold" ? "700" : type.weight === "Regular" ? "400" : "500",
                      textTransform: type.name === "Body" ? "none" : "uppercase",
                    }}
                  >
                    {type.example}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </PageSection>

        {/* 03 BUTTONS */}
        <PageSection sectionNumber="03 BUTTONS">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-4">
              <p className="text-sm font-medium text-muted-foreground">Button 1</p>
              <div className="space-y-3">
                <Button variant="default">SEE PRODUCT</Button>
                <p className="text-xs text-muted-foreground">Default</p>
                <Button variant="default" className="bg-light-orange">SEE PRODUCT</Button>
                <p className="text-xs text-muted-foreground">Hover</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-medium text-muted-foreground">Button 2</p>
              <div className="space-y-3">
                <Button variant="outline">SEE PRODUCT</Button>
                <p className="text-xs text-muted-foreground">Default</p>
                <Button variant="outline" className="bg-foreground text-background">SEE PRODUCT</Button>
                <p className="text-xs text-muted-foreground">Hover</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-medium text-muted-foreground">Button 3</p>
              <div className="space-y-3">
                <Button variant="link">SHOP &gt;</Button>
                <p className="text-xs text-muted-foreground">Default</p>
                <Button variant="link" className="text-light-orange">SHOP &gt;</Button>
                <p className="text-xs text-muted-foreground">Hover</p>
              </div>
            </div>
          </div>
        </PageSection>

        {/* 04 FORM ELEMENTS */}
        <PageSection sectionNumber="04 FORM ELEMENTS">

          {/* Text Fields */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-4">
              <p className="text-sm font-medium text-muted-foreground">Text Field Default</p>
              <TextField
                label="Name"
                placeholder="Insert your name"
              />
            </div>

            <div className="space-y-4">
              <p className="text-sm font-medium text-muted-foreground">Text Field Active</p>
              <TextField
                label="Name"
                defaultValue="Alexei"
                className="border-primary"
                readOnly
              />
            </div>

            <div className="space-y-4">
              <p className="text-sm font-medium text-muted-foreground">Text Field Error</p>
              <TextField
                label="Name"
                defaultValue="!@#!@$!@"
                error="Wrong format"
                className="border-destructive text-destructive"
                readOnly
              />
            </div>
          </div>

          {/* Radio Selections */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-4">
              <p className="text-sm font-medium text-muted-foreground">Radio Selection Default</p>
              <RadioGroup value="e-money" onValueChange={setRadioValue} className="space-y-3">
                <RadioOption value="e-money" label="e-Money" />
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-medium text-muted-foreground">Radio Selection Active</p>
              <RadioGroup value="e-money" onValueChange={setRadioValue} className="space-y-3">
                <RadioOption value="e-money" label="e-Money" />
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-medium text-muted-foreground">Radio Selection Hover</p>
              <RadioGroup value="e-money" onValueChange={setRadioValue} className="space-y-3">
                <RadioOption value="e-money" label="e-Money" className="hover:border-primary" />
              </RadioGroup>
            </div>
          </div>

          {/* Number Inputs */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <p className="text-sm font-medium text-muted-foreground">Numbers Default</p>
              <NumberInput value={1} />
            </div>

            <div className="space-y-4">
              <p className="text-sm font-medium text-muted-foreground">Numbers Hover</p>
              <NumberInput value={1} />
            </div>
          </div>
        </PageSection>

        {/* Form Example with Validation */}
        <PageSection
          title="FORM WITH VALIDATION"
          description="Form components with React Hook Form and Zod validation"
        >
          <Card>
            <CardHeader>
              <CardTitle>Example Form</CardTitle>
              <CardDescription>
                Complete form with validation and error handling
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    label="Full Name"
                    placeholder="Insert your name"
                    description="Enter your full name as it appears on your ID."
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="name@example.com"
                    description="We'll never share your email with anyone else."
                  />
                  <CardFooter className="px-0 pb-0">
                    <Button type="submit">Submit</Button>
                  </CardFooter>
                </form>
              </Form>
            </CardContent>
          </Card>
        </PageSection>
      </Container>
    </div>
  )
}
