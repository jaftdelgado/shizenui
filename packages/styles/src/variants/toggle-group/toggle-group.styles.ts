import { tv, type VariantProps } from "tailwind-variants";

export const toggleGroupStyles = tv({
  base: "toggle-group",
  variants: {
    invalid: {
      true: "toggle-group--invalid"
    },
    disabled: {
      true: "toggle-group--disabled"
    }
  },
  defaultVariants: {
    invalid: false,
    disabled: false
  }
});

export type ToggleGroupVariants = VariantProps<typeof toggleGroupStyles>;
