import { tv, type VariantProps } from "tailwind-variants";

export const chipStyles = tv({
  base: "chip",
  variants: {
    invalid: {
      true: "chip--invalid"
    },
    disabled: {
      true: "chip--disabled"
    }
  },
  defaultVariants: {
    invalid: false,
    disabled: false
  }
});

export type ChipVariants = VariantProps<typeof chipStyles>;
