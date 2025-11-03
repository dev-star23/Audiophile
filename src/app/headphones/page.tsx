import { api } from "../../../convex/_generated/api"
import { AboutSection, CategoryHeader, ProductCard, CategoryCards } from "@/components"
import { transformProduct } from "@/lib/convex"
import { getConvexClient } from "@/lib/convex-server"
import type { Doc } from "../../../convex/_generated/dataModel"

export default async function HeadphonesPage() {
  const client = getConvexClient()
  const convexProducts = await client.query(api.products.getByCategory, { category: "headphones" }) || []

  const headphones = (convexProducts || []).map((convexProduct: Doc<"products">, index: number) => {
    const product = transformProduct(convexProduct)
    return {
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
    }
  })

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

