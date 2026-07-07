import { tv, type VariantProps } from "tailwind-variants";

export const radioGroupStyles = tv({
  base: "radio-group",
  variants: {
    invalid: {
      true: "radio-group--invalid"
    },
    disabled: {
      true: "radio-group--disabled"
    }
  },
  defaultVariants: {
    invalid: false,
    disabled: false
  }
});

export type RadioGroupVariants = VariantProps<typeof radioGroupStyles>;
