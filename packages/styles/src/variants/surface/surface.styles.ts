import { tv, type VariantProps } from "tailwind-variants";

export const surfaceStyles = tv({
  base: "surface",
  variants: {
    variant: {
      default: "surface--default",
      secondary: "surface--secondary",
      outline: "surface--outline"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

export type SurfaceVariants = VariantProps<typeof surfaceStyles>;
