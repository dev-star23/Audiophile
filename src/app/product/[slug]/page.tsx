import { notFound } from "next/navigation"
import { AboutSection, CategoryCards, ProductDetail, YouMayAlsoLike } from "@/components"
import { getProductBySlug } from "@/data/products"

interface ProductPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params

  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <main>
      <ProductDetail product={product} />
      <YouMayAlsoLike currentProduct={product} />
      <CategoryCards />
      <AboutSection />
    </main>
  );
}

