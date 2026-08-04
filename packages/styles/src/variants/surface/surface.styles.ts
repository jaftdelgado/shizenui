import { tv, type VariantProps } from "tailwind-variants";

export const surfaceStyles = tv({
  base: "surface",
  variants: {
    invalid: {
      true: "surface--invalid"
    },
    disabled: {
      true: "surface--disabled"
    }
  },
  defaultVariants: {
    invalid: false,
    disabled: false
  }
});

export type SurfaceVariants = VariantProps<typeof surfaceStyles>;
