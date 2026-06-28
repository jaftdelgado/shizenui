import { tv, type VariantProps } from "tailwind-variants";

export const toggleStyles = tv({
  base: "toggle",
  variants: {
    invalid: {
      true: "toggle--invalid"
    },
    disabled: {
      true: "toggle--disabled"
    }
  },
  defaultVariants: {
    invalid: false,
    disabled: false
  }
});

export type ToggleVariants = VariantProps<typeof toggleStyles>;
