import { AboutSection, CategoryHeader, ProductCard, CategoryCards } from "@/components"

const earphones = [
  {
    new: true,
    title: "YX1 WIRELESS EARPHONES",
    description: "Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones. Enjoy incredible high-fidelity sound even in noisy environments with its active noise cancellation feature.",
    img: "/images/product-yx1-earphones/desktop/image-category-page-preview.jpg",
    imgMobile: "/images/product-yx1-earphones/mobile/image-category-page-preview.jpg",
    imgTablet: "/images/product-yx1-earphones/tablet/image-category-page-preview.jpg",
    imgDesktop: "/images/product-yx1-earphones/desktop/image-category-page-preview.jpg",
    imgAlt: "YX1 Wireless Earphones",
    imagePos: "left" as const,
    ctaHref: "/product/yx1-earphones",
  },
]

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

