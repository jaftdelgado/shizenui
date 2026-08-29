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
    variant: {
      default: { base: "alert--default" },
      secondary: { base: "alert--secondary" },
      outline: { base: "alert--outline" }
    },
    status: {
      default: { base: "alert--status-default" },
      accent: { base: "alert--status-accent" },
      success: { base: "alert--status-success" },
      warning: { base: "alert--status-warning" },
      danger: { base: "alert--status-danger" }
    }
  },
  defaultVariants: {
    variant: "default",
    status: "default"
  }
});

export type AlertVariants = VariantProps<typeof alertStyles>;
