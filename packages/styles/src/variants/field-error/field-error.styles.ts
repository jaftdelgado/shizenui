import { tv, type VariantProps } from "tailwind-variants";

export const fieldErrorStyles = tv({
  base: "field-error",
  variants: {
    truncate: {
      true: "field-error--truncate"
    }
  },
  defaultVariants: {
    truncate: false
  }
});

export type FieldErrorVariants = VariantProps<typeof fieldErrorStyles>;
