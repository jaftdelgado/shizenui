import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { TagSize, TagVariant } from "../../tag/_internal/index.js";
import type { SelectionStateMode } from "../../../lib/runes/index.js";

export type TagGroupSelectionMode = SelectionStateMode;

type TagGroupBaseProps = Omit<HTMLAttributes<HTMLDivElement>, "children">;

interface TagGroupSharedProps extends TagGroupBaseProps {
  children?: Snippet;
  disabled?: boolean;
  invalid?: boolean;
  variant?: TagVariant;
  size?: TagSize;
  onRemove?: (values: string[]) => void;
  id?: string;
  ref?: HTMLDivElement | null;
}

type TagGroupNoSelectionProps = TagGroupSharedProps & {
  selectionMode?: "none";
  value?: never;
  onValueChange?: never;
};

type TagGroupSingleSelectionProps = TagGroupSharedProps & {
  selectionMode: "single";
  value?: string;
  onValueChange?: (value: string | undefined) => void;
};

type TagGroupMultipleSelectionProps = TagGroupSharedProps & {
  selectionMode: "multiple";
  value?: string[];
  onValueChange?: (value: string[]) => void;
};

export type TagGroupProps =
  TagGroupNoSelectionProps | TagGroupSingleSelectionProps | TagGroupMultipleSelectionProps;

type TagGroupListBaseProps = Omit<HTMLAttributes<HTMLDivElement>, "children" | "role" | "tabindex">;

export interface TagGroupListProps extends TagGroupListBaseProps {
  children?: Snippet;
  ref?: HTMLDivElement | null;
}
