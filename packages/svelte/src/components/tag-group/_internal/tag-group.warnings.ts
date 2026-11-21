import { assertContext, warnIf } from "../../../lib/runes/index.js";
import type { TagGroupContext } from "./tag-group.context.js";
import type { TagGroupState } from "./tag-group.state.svelte.js";

export function setupTagGroupWarnings(options: {
  context: Pick<TagGroupState, "hasList" | "hasMultipleLists">;
  hasChildren: () => boolean;
}): void {
  warnIf(
    () => !options.hasChildren(),
    "TagGroup",
    "No children provided. Add a <TagGroup.List> with at least one <Tag> as a child."
  );

  warnIf(
    () => !options.context.hasList,
    "TagGroup",
    "No <TagGroup.List> found. Wrap your <Tag> children in <TagGroup.List> to enable grid semantics and keyboard navigation."
  );

  warnIf(
    () => options.context.hasMultipleLists,
    "TagGroup",
    "Only one <TagGroup.List> is supported per <TagGroup>. Additional lists have no tab stop and are not reachable with Tab."
  );
}

export function setupTagGroupListWarnings(options: {
  groupCtx: Pick<TagGroupContext, "exists">;
  hasChildren: () => boolean;
  /** Whether the rendered list ended up with an accessible name, from whichever source. */
  hasAccessibleName: () => boolean;
}): boolean {
  const shouldRender = assertContext(
    () => !options.groupCtx.exists,
    "TagGroup.List",
    "Must be used inside a <TagGroup> component."
  );

  warnIf(
    () => !options.hasChildren(),
    "TagGroup.List",
    "No children provided. Add at least one <Tag> as a child."
  );

  // The grid is the element that needs the name, and only the list knows where it came from.
  warnIf(
    () => shouldRender && !options.hasAccessibleName(),
    "TagGroup",
    "No accessible name found for the list. Add a <Label> as a child, or pass aria-label/aria-labelledby to <TagGroup> or <TagGroup.List>."
  );

  return shouldRender;
}
