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
      primary: { base: "input-group--primary" },
      secondary: { base: "input-group--secondary" }
    },
    fullWidth: {
      true: { base: "w-full" },
      false: {}
    }
  },
  defaultVariants: {
    variant: "primary",
    fullWidth: false
  }
});

export type InputGroupVariants = VariantProps<typeof inputGroupStyles>;
