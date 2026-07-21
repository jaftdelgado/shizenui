import { tv, type VariantProps } from "tailwind-variants";

export const checkboxGroupStyles = tv({
  slots: {
    base: "checkbox-group",
    items: "checkbox-group__items",
    input: "checkbox-group__input"
  },
  variants: {
    orientation: {
      vertical: {
        items: "checkbox-group__items--vertical"
      },
      horizontal: {
        items: "checkbox-group__items--horizontal"
      }
    }
  },
  defaultVariants: {
    orientation: "vertical"
  }
});

export type CheckboxGroupVariants = VariantProps<typeof checkboxGroupStyles>;
