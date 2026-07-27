import { tv, type VariantProps } from "tailwind-variants";

export const input-groupStyles = tv({
  base: "input-group",
  variants: {
    invalid: {
      true: "input-group--invalid"
    },
    disabled: {
      true: "input-group--disabled"
    }
  },
  defaultVariants: {
    invalid: false,
    disabled: false
  }
});

export type InputGroupVariants = VariantProps<typeof input-groupStyles>;
