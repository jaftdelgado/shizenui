import { tv, type VariantProps } from "tailwind-variants";

export const buttonGroupStyles = tv({
  base: "button-group",
  variants: {
    invalid: {
      true: "button-group--invalid"
    },
    disabled: {
      true: "button-group--disabled"
    }
  },
  defaultVariants: {
    invalid: false,
    disabled: false
  }
});

export type ButtonGroupVariants = VariantProps<typeof buttonGroupStyles>;
