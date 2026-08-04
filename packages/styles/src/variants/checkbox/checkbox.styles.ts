import { tv, type VariantProps } from "tailwind-variants";

export const checkboxStyles = tv({
  slots: {
    base: "checkbox",
    control: "checkbox__control",
    indicator: "checkbox__indicator",
    content: "checkbox__content",
    input: "checkbox__input"
  },
  variants: {
    variant: {
      default: { base: "checkbox--default" },
      secondary: { base: "checkbox--secondary" }
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

export type CheckboxVariants = VariantProps<typeof checkboxStyles>;
