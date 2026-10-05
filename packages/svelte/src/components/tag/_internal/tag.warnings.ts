import { warnIf } from "../../../lib/runes/index.js";
import type { TagStateInstance } from "./tag.state.svelte.js";

export function setupTagWarnings(options: {
  state: TagStateInstance;
  hasChildren: () => boolean;
}): void {
  warnIf(
    () => !options.state.groupCtx.exists,
    "Tag",
    "Tag must be used inside a <TagGroup.List>. Outside a TagGroup it renders as a static, non-interactive element."
  );

  warnIf(
    () => !options.hasChildren(),
    "Tag",
    "No children provided. Add the tag text as a child."
  );
}
