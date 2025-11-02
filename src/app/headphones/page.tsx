import { AboutSection, CategoryHeader, ProductCard, CategoryCards } from "@/components"
import { headphones as headphonesData } from "@/data/products"

const headphones = headphonesData.map((product, index) => ({
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

export default function HeadphonesPage() {
  return (
    <main>
      <CategoryHeader categoryName="HEADPHONES" />
      {headphones.map((headphone) => (
        <ProductCard key={headphone.ctaHref} {...headphone} />
      ))}
      <CategoryCards />
      <AboutSection />
    </main>
  );
}

