import { tv, type VariantProps } from "tailwind-variants";

export const checkboxGroupStyles = tv({
  base: "checkbox-group",
  variants: {
    invalid: {
      true: "checkbox-group--invalid"
    },
    disabled: {
      true: "checkbox-group--disabled"
    }
  },
  defaultVariants: {
    invalid: false,
    disabled: false
  }
});

export type CheckboxGroupVariants = VariantProps<typeof checkboxGroupStyles>;
