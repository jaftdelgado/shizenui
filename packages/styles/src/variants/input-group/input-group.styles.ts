import { tv, type VariantProps } from "tailwind-variants";

export const inputGroupStyles = tv({
  slots: {
    base: "input-group",
    prefix: "input-group__prefix",
    suffix: "input-group__suffix",
    input: "input-group__input",
    textarea: "input-group__textarea"
  },
  variants: {
    variant: {
      default: { base: "input-group--default" },
      secondary: { base: "input-group--secondary" },
      outline: { base: "input-group--outline" }
    },
    size: {
      sm: { base: "input-group--sm" },
      md: { base: "input-group--md" },
      lg: { base: "input-group--lg" }
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md"
  }
});

export type InputGroupVariants = VariantProps<typeof inputGroupStyles>;
