import { AboutSection, CategoryHeader, ProductCard, CategoryCards } from "@/components"
import { earphones as earphonesData } from "@/data/products"

const earphones = earphonesData.map((product, index) => ({
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

export default function EarphonesPage() {
  return (
    <main>
      <CategoryHeader categoryName="EARPHONES" />
      {earphones.map((earphone) => (
        <ProductCard key={earphone.ctaHref} {...earphone} />
      ))}
      <CategoryCards />
      <AboutSection />
    </main>
  )
}

