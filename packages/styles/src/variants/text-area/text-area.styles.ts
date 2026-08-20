import { tv, type VariantProps } from "tailwind-variants";

export const textAreaStyles = tv({
  base: "textarea",
  variants: {
    variant: {
      default: "textarea--default",
      secondary: "textarea--secondary",
      outline: "textarea--outline"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

export type TextAreaVariants = VariantProps<typeof textAreaStyles>;
