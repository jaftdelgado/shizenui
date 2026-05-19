import { tv, type VariantProps } from "tailwind-variants";

export const switchStyles = tv({
  slots: {
    base: "switch",
    input: "switch__input",
    control: "switch__control",
    thumb: "switch__thumb",
    thumbContent: "switch__thumb-content",
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
