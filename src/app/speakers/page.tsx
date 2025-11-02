import { AboutSection, CategoryHeader, ProductCard, CategoryCards } from "@/components"

const speakers = [
  {
    new: true,
    title: "ZX9 SPEAKER",
    description: "Upgrade your sound system with the all new ZX9 active speaker. It's a bookshelf speaker system that offers truly wireless connectivity - creating new possibilities for more pleasing and practical audio setups.",
    img: "/images/shared/desktop/image-zx9-speaker.jpg",
    imgMobile: "/images/shared/mobile/image-zx9-speaker.jpg",
    imgTablet: "/images/shared/tablet/image-zx9-speaker.jpg",
    imgDesktop: "/images/shared/desktop/image-zx9-speaker.jpg",
    imgAlt: "ZX9 Speaker",
    imagePos: "left" as const,
    ctaHref: "/product/zx9-speaker",
  },
  {
    title: "ZX7 SPEAKER",
    description: "Stream high quality sound wirelessly with minimal loss. The ZX7 bookshelf speaker uses high-end audiophile components that represents the top of the line powered speakers for home or studio use.",
    img: "/images/shared/desktop/image-zx7-speaker.jpg",
    imgMobile: "/images/shared/mobile/image-zx7-speaker.jpg",
    imgTablet: "/images/shared/tablet/image-zx7-speaker.jpg",
    imgDesktop: "/images/shared/desktop/image-zx7-speaker.jpg",
    imgAlt: "ZX7 Speaker",
    imagePos: "right" as const,
    ctaHref: "/product/zx7-speaker",
  },
]

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

