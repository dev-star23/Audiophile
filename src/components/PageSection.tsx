import * as React from "react"
import { cn } from "@/lib/utils"

export interface PageSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
  sectionNumber?: string
  description?: string
}

const PageSection = React.forwardRef<HTMLDivElement, PageSectionProps>(
  ({ className, title, subtitle, sectionNumber, description, children, ...props }, ref) => {
    return (
      <section ref={ref} className={cn("space-y-6", className)} {...props}>
        {(title || sectionNumber) && (
          <div className="space-y-2">
            {sectionNumber && (
              <h2 className="text-overline tracking-[10px] text-primary">
                {sectionNumber}
              </h2>
            )}
            {title && (
              <h3 className="text-2xl font-bold">{title}</h3>
            )}
            {subtitle && (
              <h4 className="text-xl font-semibold">{subtitle}</h4>
            )}
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        )}
        {children}
      </section>
    )
  }
)
PageSection.displayName = "PageSection"

export { PageSection }

