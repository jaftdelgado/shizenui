import { tv, type VariantProps } from "tailwind-variants";

export const descriptionStyles = tv({
  base: "description"
});

export type DescriptionVariants = VariantProps<typeof descriptionStyles>;
