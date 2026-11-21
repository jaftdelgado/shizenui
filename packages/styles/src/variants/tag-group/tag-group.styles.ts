import { tv, type VariantProps } from "tailwind-variants";

export const tagGroupStyles = tv({
  slots: {
    base: "tag-group",
    list: "tag-group__list"
  }
});

export type TagGroupVariants = VariantProps<typeof tagGroupStyles>;
