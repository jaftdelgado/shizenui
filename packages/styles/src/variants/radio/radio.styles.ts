import { tv, type VariantProps } from "tailwind-variants";

export const radioStyles = tv({
  slots: {
    base: "radio",
    control: "radio__control",
    indicator: "radio__indicator",
    content: "radio__content"
  }
});

export type RadioVariants = VariantProps<typeof radioStyles>;
