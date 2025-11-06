import { api } from "../../../convex/_generated/api"
import type { Doc } from "../../../convex/_generated/dataModel"
import { AboutSection, CategoryHeader, ProductCard, CategoryCards } from "@/components"
import { transformProduct } from "@/lib/convex"
import { getConvexClient } from "@/lib/convex-server"

export default async function EarphonesPage() {
  const client = getConvexClient()
  const convexProducts = await client.query(api.products.getByCategory, { category: "earphones" }) || []

  const earphones = (convexProducts || []).reverse().map((convexProduct: Doc<"products">, index: number) => {
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
      <CategoryHeader categoryName="EARPHONES" />
      {earphones.map((earphone) => (
        <ProductCard key={earphone.ctaHref} {...earphone} />
      ))}
      <CategoryCards />
      <AboutSection />
    </main>
  )
}

