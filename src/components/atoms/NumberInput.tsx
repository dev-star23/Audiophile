import * as React from "react"
import { Minus, Plus } from "lucide-react"

import { cn } from "@/lib/utils"

export interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  onIncrement?: () => void
  onDecrement?: () => void
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ className, onIncrement, onDecrement, value, onChange, ...props }, ref) => {
    const [count, setCount] = React.useState(Number(value) || 1)

    const handleIncrement = () => {
      const newValue = count + 1
      setCount(newValue)
      onIncrement?.()
      // Create a synthetic event for onChange
      if (onChange) {
        const event = {
          target: { value: String(newValue) },
        } as React.ChangeEvent<HTMLInputElement>
        onChange(event)
      }
    }

    const handleDecrement = () => {
      const newValue = Math.max(1, count - 1)
      setCount(newValue)
      onDecrement?.()
      if (onChange) {
        const event = {
          target: { value: String(newValue) },
        } as React.ChangeEvent<HTMLInputElement>
        onChange(event)
      }
    }

    React.useEffect(() => {
      setCount(Number(value) || 1)
    }, [value])

    return (
      <div className="flex items-center gap-0 rounded-md bg-muted">
        <button
          type="button"
          onClick={handleDecrement}
          className="flex h-10 w-10 items-center justify-center rounded-l-md text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Decrease"
        >
          <Minus className="h-4 w-4" />
        </button>
        <input
          type="number"
          ref={ref}
          value={count}
          onChange={(e) => {
            const newValue = Number(e.target.value) || 1
            setCount(newValue)
            onChange?.(e)
          }}
          className={cn(
            "h-10 w-12 border-0 bg-transparent text-center text-sm font-medium focus:outline-none focus:ring-0",
            className
          )}
          min={1}
          {...props}
        />
        <button
          type="button"
          onClick={handleIncrement}
          className="flex h-10 w-10 items-center justify-center rounded-r-md text-muted-foreground hover:text-primary transition-colors"
          aria-label="Increase"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    )
  }
)
NumberInput.displayName = "NumberInput"

export { NumberInput }

