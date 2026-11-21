import { assertContext, warnIf } from "../../../lib/runes/index.js";
import type { TagContext } from "./tag.context.js";
import type { TagState } from "./tag.state.svelte.js";

export function setupTagWarnings(options: { state: TagState; hasChildren: () => boolean }): void {
  warnIf(
    () => !options.state.inGroup,
    "Tag",
    "Tag must be used inside a <TagGroup.List>. Outside a TagGroup it cannot be selected or reached with the keyboard: only its remove button and a mouse `onclick` work."
  );

  warnIf(
    () => options.state.inGroup && !options.state.inList,
    "Tag",
    "Tag is inside a <TagGroup> but outside its <TagGroup.List>, so it cannot be reached with Tab or the arrow keys. Move it into the <TagGroup.List>."
  );

  warnIf(() => !options.hasChildren(), "Tag", "No children provided. Add the tag text as a child.");
}

export function setupTagRemoveButtonWarnings(options: {
  tagCtx: Pick<TagContext, "exists" | "isRemovable">;
}): boolean {
  const { tagCtx } = options;

  const shouldRender = assertContext(
    () => !tagCtx.exists,
    "Tag.RemoveButton",
    "Must be used inside a <Tag> component."
  );

  warnIf(
    () => tagCtx.exists && !tagCtx.isRemovable,
    "Tag.RemoveButton",
    "Neither the Tag nor its TagGroup has an `onRemove` handler, so the button is not rendered. Pass `onRemove` to <Tag> or <TagGroup>."
  );

  return shouldRender;
}
