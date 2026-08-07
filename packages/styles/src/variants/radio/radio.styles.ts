import { tv, type VariantProps } from "tailwind-variants";

export const radioStyles = tv({
  slots: {
    base: "radio",
    control: "radio__control",
    indicator: "radio__indicator",
    content: "radio__content",
    input: "radio__input"
  },
  variants: {
    variant: {
      default: { base: "radio--default" },
      secondary: { base: "radio--secondary" }
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

export type RadioVariants = VariantProps<typeof radioStyles>;
