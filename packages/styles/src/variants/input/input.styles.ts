import { tv, type VariantProps } from "tailwind-variants";

export const inputStyles = tv({
  base: "input",
  variants: {
    size: {
      sm: "input--sm",
      md: "input--md",
      lg: "input--lg"
    },
    variant: {
      default: "input--default",
      secondary: "input--secondary",
      outline: "input--outline"
    }
  },
  defaultVariants: {
    size: "md",
    variant: "default"
  }
});

export type InputVariants = VariantProps<typeof inputStyles>;
