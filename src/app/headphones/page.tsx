import { AboutSection, CategoryHeader, ProductCard, CategoryCards } from "@/components"

const headphones = [
  {
    new: true,
    title: "XX99 MARK II HEADPHONES",
    description: "The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.",
    img: "/images/shared/desktop/image-xx99-mark-two-headphones.jpg",
    imgMobile: "/images/shared/mobile/image-xx99-mark-two-headphones.jpg",
    imgTablet: "/images/shared/tablet/image-xx99-mark-two-headphones.jpg",
    imgDesktop: "/images/shared/desktop/image-xx99-mark-two-headphones.jpg",
    imgAlt: "XX99 Mark II Headphones",
    imagePos: "left" as const,
    ctaHref: "/product/xx99-mark-two-headphones",
  },
  {
    title: "XX99 MARK I HEADPHONES",
    description: "As the gold standard for headphones, the classic XX99 Mark I offers detailed and accurate audio reproduction for audiophiles, mixing engineers, and music aficionados alike in studios and on the go.",
    img: "/images/shared/desktop/image-xx99-mark-one-headphones.jpg",
    imgMobile: "/images/shared/mobile/image-xx99-mark-one-headphones.jpg",
    imgTablet: "/images/shared/tablet/image-xx99-mark-one-headphones.jpg",
    imgDesktop: "/images/shared/desktop/image-xx99-mark-one-headphones.jpg",
    imgAlt: "XX99 Mark I Headphones",
    imagePos: "right" as const,
    ctaHref: "/product/xx99-mark-one-headphones",
  },
  {
    title: "XX59 HEADPHONES",
    description: "Enjoy your audio almost anywhere and customize it to your specific tastes with the XX59 headphones. The stylish yet durable versatile wireless headset is a brilliant companion at home or on the move.",
    img: "/images/shared/desktop/image-xx59-headphones.jpg",
    imgMobile: "/images/shared/mobile/image-xx59-headphones.jpg",
    imgTablet: "/images/shared/tablet/image-xx59-headphones.jpg",
    imgDesktop: "/images/shared/desktop/image-xx59-headphones.jpg",
    imgAlt: "XX59 Headphones",
    imagePos: "left" as const,
    ctaHref: "/product/xx59-headphones",
  },
]

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

