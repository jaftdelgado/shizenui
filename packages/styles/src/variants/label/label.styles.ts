import { tv, type VariantProps } from "tailwind-variants";

export const labelStyles = tv({
  slots: {
    base: "label",
    requiredIndicator: "label__required-indicator"
  },
  variants: {
    invalid: {
      true: {
        base: "label--invalid"
      }
    }
  },
  defaultVariants: {
    invalid: false
  }
});

export type LabelVariants = VariantProps<typeof labelStyles>;
