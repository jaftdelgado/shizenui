import { tv, type VariantProps } from "tailwind-variants";

export const toggleStyles = tv({
  slots: {
    base: "toggle",
    content: "toggle__content",
    icon: "toggle__icon",
    iconStart: "toggle__icon toggle__icon--start",
    iconEnd: "toggle__icon toggle__icon--end",
    label: "toggle__label"
  },
  variants: {
    variant: {
      default: { base: "toggle--default" },
      outline: { base: "toggle--outline" },
      ghost: { base: "toggle--ghost" }
    },
    size: {
      sm: { base: "toggle--sm" },
      md: { base: "toggle--md" },
      lg: { base: "toggle--lg" }
    },
    iconOnly: {
      true: { base: "toggle--icon-only" }
    }
  },
  compoundVariants: [
    { iconOnly: true, size: "sm", class: { base: "toggle--icon-only--sm" } },
    { iconOnly: true, size: "md", class: { base: "toggle--icon-only--md" } },
    { iconOnly: true, size: "lg", class: { base: "toggle--icon-only--lg" } }
  ],
  defaultVariants: {
    variant: "default",
    size: "md"
  }
});

export type ToggleVariants = VariantProps<typeof toggleStyles>;
