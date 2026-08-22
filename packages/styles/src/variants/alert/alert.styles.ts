import { tv, type VariantProps } from "tailwind-variants";

export const alertStyles = tv({
  slots: {
    base: "alert",
    indicator: "alert__indicator",
    content: "alert__content",
    title: "alert__title",
    description: "alert__description",
    actions: "alert__actions"
  },
  variants: {
    color: {
      default: { base: "alert--default" },
      accent: { base: "alert--accent" },
      info: { base: "alert--info" },
      success: { base: "alert--success" },
      warning: { base: "alert--warning" },
      danger: { base: "alert--danger" },
      error: { base: "alert--error" }
    },
    size: {
      sm: { base: "alert--sm" },
      md: { base: "alert--md" },
      lg: { base: "alert--lg" }
    }
  },
  defaultVariants: {
    color: "default",
    size: "md"
  }
});

export type AlertVariants = VariantProps<typeof alertStyles>;
