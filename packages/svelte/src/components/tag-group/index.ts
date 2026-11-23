import Root from "./TagGroup.svelte";
import List from "./compound/List.svelte";

export type { TagGroupProps, TagGroupListProps, TagGroupSelectionMode } from "./_internal/index.js";

export const TagGroup = Object.assign(Root, {
  List
});
