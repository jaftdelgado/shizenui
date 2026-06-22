import { tv, type VariantProps } from "tailwind-variants";

export const buttonStyles = tv({
  slots: {
    base: "button",
    content: "button__content",
    icon: "button__icon",
    iconStart: "button__icon button__icon--start",
    iconEnd: "button__icon button__icon--end",
    label: "button__label"
  },
  variants: {
    variant: {
      primary: { base: "button--primary" },
      secondary: { base: "button--secondary" },
      tertiary: { base: "button--tertiary" },
      danger: { base: "button--danger" },
      ghost: { base: "button--ghost" },
      outline: { base: "button--outline" },
      "soft-danger": { base: "button--soft-danger" }
    },
    size: {
      sm: { base: "button--sm" },
      md: { base: "button--md" },
      lg: { base: "button--lg" }
    },
    iconOnly: {
      true: { base: "button--icon-only" }
    }
  },
  compoundVariants: [
    {
      iconOnly: true,
      size: "sm",
      class: { base: "button--icon-only--sm" }
    },
    {
      iconOnly: true,
      size: "md",
      class: { base: "button--icon-only--md" }
    },
    {
      iconOnly: true,
      size: "lg",
      class: { base: "button--icon-only--lg" }
    }
  ],
  defaultVariants: {
    variant: "primary",
    size: "md"
  }
});

export type ButtonVariants = VariantProps<typeof buttonStyles>;
