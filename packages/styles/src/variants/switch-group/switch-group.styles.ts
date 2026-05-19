import { tv, type VariantProps } from "tailwind-variants";

export const switchGroupStyles = tv({
  slots: {
    base: "switch-group",
    items: "switch-group__items"
  },
  variants: {
    orientation: {
      vertical: {
        items: "switch-group__items--vertical"
      },
      horizontal: {
        items: "switch-group__items--horizontal"
      }
    }
  },
  defaultVariants: {
    orientation: "vertical"
  }
});

export type SwitchGroupVariants = VariantProps<typeof switchGroupStyles>;
