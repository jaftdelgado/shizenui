import { tv, type VariantProps } from "tailwind-variants";

export const textAreaStyles = tv({
  slots: {
    base: "text-area"
  },
  variants: {
    variant: {
      default: { base: "text-area--default" },
      secondary: { base: "text-area--secondary" },
      outline: { base: "text-area--outline" }
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

export type TextAreaVariants = VariantProps<typeof textAreaStyles>;
