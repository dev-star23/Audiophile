"use client"

import * as React from "react"
import {
  FormControl,
  FormDescription,
  FormField as ShadcnFormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem, RadioGroupCard } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { NumberInput } from "@/components/ui/number-input"
import type { Control, FieldPath, FieldValues } from "react-hook-form"

interface BaseFormFieldProps<T extends FieldValues> {
  control: Control<T>
  name: FieldPath<T>
  label: string
  description?: string
}

interface TextFormFieldProps<T extends FieldValues> extends BaseFormFieldProps<T> {
  type?: "text" | "email" | "password" | "tel"
  placeholder?: string
}

interface RadioFormFieldProps<T extends FieldValues> extends BaseFormFieldProps<T> {
  type: "radio"
  options: Array<{ value: string; label: string }>
}

interface NumberFormFieldProps<T extends FieldValues> extends BaseFormFieldProps<T> {
  type: "number"
}

type FormFieldProps<T extends FieldValues> =
  | TextFormFieldProps<T>
  | RadioFormFieldProps<T>
  | NumberFormFieldProps<T>

export function FormField<T extends FieldValues>(props: FormFieldProps<T>) {
  const { control, name, label, description } = props

  return (
    <ShadcnFormField
      control={control}
      name={name}
      render={({ field }) => {
        if (props.type === "radio") {
          return (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="space-y-3"
                >
                  {props.options.map((option) => (
                    <RadioGroupCard
                      key={option.value}
                      checked={field.value === option.value}
                    >
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value} className="font-medium cursor-pointer">
                        {option.label}
                      </Label>
                    </RadioGroupCard>
                  ))}
                </RadioGroup>
              </FormControl>
              {description && (
                <FormDescription>{description}</FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )
        }

        if (props.type === "number") {
          return (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <NumberInput {...field} value={field.value || 1} />
              </FormControl>
              {description && (
                <FormDescription>{description}</FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )
        }

        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input
                type={props.type || "text"}
                placeholder={props.placeholder}
                {...field}
              />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}

