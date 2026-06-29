import { tv, type VariantProps } from "tailwind-variants";

export const toggleGroupStyles = tv({
  base: "toggle-group",
  variants: {
    variant: {
      default: "toggle-group--default",
      outline: "toggle-group--outline",
      ghost: "toggle-group--ghost"
    },
    size: {
      sm: "toggle-group--sm",
      md: "toggle-group--md",
      lg: "toggle-group--lg"
    },
    hideSeparator: {
      false: "toggle-group--separators",
      true: ""
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    hideSeparator: false
  }
});

export type ToggleGroupVariants = VariantProps<typeof toggleGroupStyles>;
