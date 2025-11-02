"use client"

import { Container } from "./Container"
import { cn } from "@/lib/utils"

export interface CategoryHeaderProps {
  categoryName: string
  className?: string
}

export function CategoryHeader({ categoryName, className }: CategoryHeaderProps) {
  return (
    <section className={cn("bg-foreground text-white", className)}>
      <Container>
        <div className="flex items-center justify-center min-h-40 md:min-h-48 py-10 md:py-13">
          <h1 className="text-[22px] md:text-[32px] lg:text-[45px] font-bold tracking-[2px] md:tracking-[1.5px] uppercase text-center">
            {categoryName}
          </h1>
        </div>
      </Container>
    </section>
  )
}

