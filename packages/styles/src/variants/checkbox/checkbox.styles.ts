import { tv, type VariantProps } from "tailwind-variants";

export const checkboxStyles = tv({
  slots: {
    base: "checkbox",
    control: "checkbox__control",
    indicator: "checkbox__indicator",
    content: "checkbox__content"
  }
});

export type CheckboxVariants = VariantProps<typeof checkboxStyles>;
