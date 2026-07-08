import { tv, type VariantProps } from "tailwind-variants";

export const radioGroupStyles = tv({
  slots: {
    base: "radio-group",
    items: "radio-group__items"
  },
  variants: {
    orientation: {
      vertical: {
        items: "radio-group__items--vertical"
      },
      horizontal: {
        items: "radio-group__items--horizontal"
      }
    }
  },
  defaultVariants: {
    orientation: "vertical"
  }
});

export type RadioGroupVariants = VariantProps<typeof radioGroupStyles>;
