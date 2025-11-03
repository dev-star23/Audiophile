import { notFound } from "next/navigation"
import { api } from "../../../../convex/_generated/api"
import { AboutSection, CategoryCards, ProductDetail, YouMayAlsoLike } from "@/components"
import { transformProduct } from "@/lib/convex"
import { getConvexClient } from "@/lib/convex-server"

interface ProductPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params

  const client = getConvexClient()
  const convexProduct = await client.query(api.products.getBySlug, { slug })

  if (!convexProduct) {
    notFound()
  }

  const product = transformProduct(convexProduct)

  return (
    <main>
      <ProductDetail product={product} />
      <YouMayAlsoLike currentProduct={product} />
      <CategoryCards />
      <AboutSection />
    </main>
  );
}

