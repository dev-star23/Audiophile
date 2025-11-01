import * as React from "react"
import { RadioGroupItem, RadioGroupCard } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export interface RadioOptionProps {
  value: string
  label: string
  className?: string
}

const RadioOption = React.forwardRef<HTMLDivElement, RadioOptionProps>(
  ({ value, label, className }, ref) => {
    const fieldId = React.useId()

    return (
      <RadioGroupCard
        ref={ref}
        className={cn(className)}
      >
        <RadioGroupItem value={value} id={fieldId} />
        <Label htmlFor={fieldId} className="font-medium cursor-pointer">
          {label}
        </Label>
      </RadioGroupCard>
    )
  }
)
RadioOption.displayName = "RadioOption"

export { RadioOption }

