import { tv, type VariantProps } from "tailwind-variants";

export const checkboxStyles = tv({
  base: "checkbox",
  variants: {
    invalid: {
      true: "checkbox--invalid"
    },
    disabled: {
      true: "checkbox--disabled"
    }
  },
  defaultVariants: {
    invalid: false,
    disabled: false
  }
});

export type CheckboxVariants = VariantProps<typeof checkboxStyles>;
