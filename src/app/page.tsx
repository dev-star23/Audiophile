import { HeroSection, CategoryCards, ProductsSection, AboutSection } from "@/components"

export default function Home() {
  return (
    <main>
      <HeroSection
        label="NEW PRODUCT"
        title="XX99 MARK II HEADPHONES"
        description="Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast."
        ctaText="SEE PRODUCT"
        ctaHref="/product/xx99-mark-two-headphones"
      />
      <CategoryCards />
      <ProductsSection />
      <AboutSection />
    </main>
  )
}
