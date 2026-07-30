import { tv, type VariantProps } from "tailwind-variants";

export const textFieldStyles = tv({
  base: "text-field",
  variants: {
    invalid: {
      true: "text-field--invalid"
    },
    disabled: {
      true: "text-field--disabled"
    }
  },
  defaultVariants: {
    invalid: false,
    disabled: false
  }
});

export type TextFieldVariants = VariantProps<typeof textFieldStyles>;
