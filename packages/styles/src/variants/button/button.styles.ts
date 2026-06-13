import { tv, type VariantProps } from "tailwind-variants";

export const buttonStyles = tv({
  base: "button",
  variants: {
    variant: {
      primary: "button--primary",
      secondary: "button--secondary",
      tertiary: "button--tertiary",
      danger: "button--danger",
      ghost: "button--ghost",
      outline: "button--outline",
      "soft-danger": "button--soft-danger"
    },
    size: {
      sm: "button--sm",
      md: "button--md",
      lg: "button--lg"
    },
    iconOnly: {
      true: "button--icon-only"
    }
  },
  compoundVariants: [
    {
      iconOnly: true,
      size: "sm",
      class: "button--icon-only--sm"
    },
    {
      iconOnly: true,
      size: "md",
      class: "button--icon-only--md"
    },
    {
      iconOnly: true,
      size: "lg",
      class: "button--icon-only--lg"
    }
  ],
  defaultVariants: {
    variant: "primary",
    size: "md"
  }
});

export type ButtonVariants = VariantProps<typeof buttonStyles>;
