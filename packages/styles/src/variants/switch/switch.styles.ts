import { tv, type VariantProps } from "tailwind-variants";

export const switchStyles = tv({
  slots: {
    base: "switch",
    control: "switch__control",
    thumb: "switch__thumb",
    content: "switch__content"
  },
  variants: {
    size: {
      sm: {
        base: "switch--sm"
      },
      md: {
        base: ""
      },
      lg: {
        base: "switch--lg"
      }
    }
  },
  defaultVariants: {
    size: "md"
  }
});

export type SwitchVariants = VariantProps<typeof switchStyles>;
