import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

export type SurfaceVariant = "default" | "secondary" | "outline";

type SurfaceBaseProps = Omit<HTMLAttributes<HTMLDivElement>, "children">;

export interface SurfaceProps extends SurfaceBaseProps {
  variant?: SurfaceVariant;
  children?: Snippet;
  ref?: HTMLDivElement | null;
}
