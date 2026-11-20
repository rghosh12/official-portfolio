import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Every solid variant renders the site's pressable "box button" (globals.css).
// ghost/link stay flat: they are text-level actions, not buttons-as-objects.
const buttonVariants = cva("", {
    variants: {
      variant: {
        default: "box-btn box-btn--primary",
        destructive: "box-btn [--face:var(--error)] [--face-hover:var(--error-light)] [--depth:#7f1d1d] text-white hover:text-white",
        outline: "box-btn",
        secondary: "box-btn",
        ghost:
          "inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-[var(--surface-3)] disabled:pointer-events-none disabled:opacity-50",
        link: "inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "",
        sm: "box-btn--sm",
        lg: "box-btn--lg",
        icon: "box-btn--icon",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
