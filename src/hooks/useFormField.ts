import { useFormContext } from "react-hook-form"

/**
 * Custom hook to get form field state and helpers
 * Usage: const { value, onChange, error } = useFormField("email")
 */
export function useFormField<T extends Record<string, any>>(name: keyof T) {
  const form = useFormContext<T>()
  const value = form.watch(name)
  const error = form.formState.errors[name]

  return {
    value,
    error: error?.message as string | undefined,
    onChange: (newValue: any) => form.setValue(name as any, newValue),
    register: form.register,
    formState: form.formState,
  }
}

