import { tv, type VariantProps } from "tailwind-variants";

export const chipStyles = tv({
  slots: {
    base: "chip",
    content: "chip__content",
    iconStart: "chip__icon chip__icon--start",
    iconEnd: "chip__icon chip__icon--end",
    label: "chip__label"
  },
  variants: {
    status: {
      default: { base: "chip--default" },
      accent: { base: "chip--accent" },
      success: { base: "chip--success" },
      warning: { base: "chip--warning" },
      danger: { base: "chip--danger" }
    },
    variant: {
      primary: { base: "chip--primary" },
      secondary: { base: "chip--secondary" },
      ghost: { base: "chip--ghost" },
      soft: { base: "chip--soft" }
    }
  },
  defaultVariants: {
    status: "default",
    variant: "primary"
  }
});

export type ChipVariants = VariantProps<typeof chipStyles>;
