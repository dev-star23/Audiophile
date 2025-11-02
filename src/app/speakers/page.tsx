import { AboutSection, CategoryHeader, ProductCard, CategoryCards } from "@/components"
import { speakers as speakersData } from "@/data/products"

// Map product data to ProductCard format
const speakers = speakersData.map((product, index) => ({
  new: product.new,
  title: product.title,
  description: product.description,
  img: product.img,
  imgMobile: product.imgMobile,
  imgTablet: product.imgTablet,
  imgDesktop: product.imgDesktop,
  imgAlt: product.imgAlt,
  imagePos: (index % 2 === 0 ? "left" : "right") as "left" | "right",
  ctaHref: `/product/${product.slug}`,
}))

export default function SpeakersPage() {
  return (
    <main>
      <CategoryHeader categoryName="SPEAKERS" />
      {speakers.map((speaker) => (
        <ProductCard key={speaker.ctaHref} {...speaker} />
      ))}
      <CategoryCards />
      <AboutSection />
    </main>
  )
}

