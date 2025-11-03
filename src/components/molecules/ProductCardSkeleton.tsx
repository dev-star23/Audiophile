import { Container } from "../layout/Container"
import { cn } from "@/lib/utils"

export interface ProductCardSkeletonProps {
  count?: number
  className?: string
}

export function ProductCardSkeleton({ count = 1, className }: ProductCardSkeletonProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-4 lg:gap-8", className)}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex flex-col items-center animate-pulse">
          {/* Image Skeleton */}
          <div className="relative w-full aspect-square bg-muted rounded-lg mb-6" />

          {/* Title Skeleton */}
          <div className="h-6 md:h-4 lg:h-5 xl:h-7 w-32 md:w-24 lg:w-36 bg-muted rounded mb-6" />

          {/* Button Skeleton */}
          <div className="h-12 md:h-10 w-40 bg-muted rounded" />
        </div>
      ))}
    </div>
  )
}

export interface YouMayAlsoLikeSkeletonProps {
  className?: string
}

export function YouMayAlsoLikeSkeleton({ className }: YouMayAlsoLikeSkeletonProps) {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <Container>
        {/* Section Title Skeleton */}
        <div className="h-8 md:h-10 w-64 mx-auto bg-muted rounded mb-10 md:mb-14 animate-pulse" />
        
        {/* Products Grid Skeleton */}
        <ProductCardSkeleton count={3} />
      </Container>
    </section>
  )
}

