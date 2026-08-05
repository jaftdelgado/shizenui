import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";
import type { SurfaceVariants } from "@shizen-ui/styles";

export type SurfaceProps = Omit<HTMLAttributes<HTMLDivElement>, "class"> &
  SurfaceVariants & {
    children?: Snippet;
    class?: string;
    ref?: HTMLDivElement | null;
  };
