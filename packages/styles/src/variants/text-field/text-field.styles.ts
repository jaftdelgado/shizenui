import { tv, type VariantProps } from "tailwind-variants";

export const textFieldStyles = tv({
  base: "text-field"
});

export type TextFieldVariants = VariantProps<typeof textFieldStyles>;
