import * as React from "react"
import { Input } from "../atoms/Input"
import { Label } from "../atoms/Label"
import { cn } from "@/lib/utils"

export interface TextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  description?: string
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className, label, error, description, id, ...props }, ref) => {
    const fieldId = id || React.useId()
    const hasError = !!error

    return (
      <div className="space-y-2">
        {label && (
          <div className="flex items-center justify-between">
            <Label
              htmlFor={fieldId}
              className={cn(hasError && "text-destructive")}
            >
              {label}
            </Label>
            {error && (
              <p className="text-xs text-destructive font-medium">{error}</p>
            )}
          </div>
        )}
        <Input
          ref={ref}
          id={fieldId}
          className={cn(
            hasError && "border-destructive text-destructive",
            className
          )}
          {...props}
        />
        {description && !error && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    )
  }
)
TextField.displayName = "TextField"

export { TextField }

