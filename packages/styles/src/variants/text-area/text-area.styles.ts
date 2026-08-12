import { tv, type VariantProps } from "tailwind-variants";

export const textAreaStyles = tv({
  base: "text-area",
  variants: {
    invalid: {
      true: "text-area--invalid"
    },
    disabled: {
      true: "text-area--disabled"
    }
  },
  defaultVariants: {
    invalid: false,
    disabled: false
  }
});

export type TextAreaVariants = VariantProps<typeof textAreaStyles>;
