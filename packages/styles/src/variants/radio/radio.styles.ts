import { tv, type VariantProps } from "tailwind-variants";

export const radioStyles = tv({
  base: "radio",
  variants: {
    invalid: {
      true: "radio--invalid"
    },
    disabled: {
      true: "radio--disabled"
    }
  },
  defaultVariants: {
    invalid: false,
    disabled: false
  }
});

export type RadioVariants = VariantProps<typeof radioStyles>;
