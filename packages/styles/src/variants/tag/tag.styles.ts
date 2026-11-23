import { tv, type VariantProps } from "tailwind-variants";

export const tagStyles = tv({
  slots: {
    base: "tag",
    content: "tag__content",
    label: "tag__label",
    iconStart: "tag__icon tag__icon--start",
    iconEnd: "tag__icon tag__icon--end",
    removeButton: "tag__remove-button"
  },
  variants: {
    variant: {
      default: { base: "tag--default" },
      secondary: { base: "tag--secondary" }
    },
    size: {
      sm: { base: "tag--sm" },
      md: { base: "tag--md" },
      lg: { base: "tag--lg" }
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md"
  }
});

export type TagVariants = VariantProps<typeof tagStyles>;
