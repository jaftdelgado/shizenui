import { tv, type VariantProps } from "tailwind-variants";

export const inputStyles = tv({
  base: "input",
  variants: {
    invalid: {
      true: "input--invalid"
    },
    disabled: {
      true: "input--disabled"
    }
  },
  defaultVariants: {
    invalid: false,
    disabled: false
  }
});

export type InputVariants = VariantProps<typeof inputStyles>;
