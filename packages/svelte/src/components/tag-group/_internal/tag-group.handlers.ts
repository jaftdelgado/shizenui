import type { TagGroupListApi } from "./tag-group.context.js";
import { TAG_SELECTOR } from "./tag-group.constants.js";
import {
  createRovingContainer,
  createRovingKeydown,
  getSelectionIntent
} from "../../../lib/utils/index.js";
import type { SelectionIntentResolver } from "../../../lib/utils/index.js";

const NAVIGATION_OPTIONS = {
  orientation: "horizontal",
  allowCrossAxis: true,
  includeHomeEnd: true,
  includePageUpDown: true
} as const;

export function createTagGroupListHandlers(options: {
  getContainer: () => HTMLDivElement | null;
  groupCtx: Pick<TagGroupListApi, "tabStopId" | "setActiveId" | "extendSelectionTo">;
  /** What each key does to the selection. Not a prop of the component: the default is the one. */
  resolveSelectionIntent?: SelectionIntentResolver;
}) {
  const { getContainer, groupCtx, resolveSelectionIntent = getSelectionIntent } = options;

  // The list is focusable itself so that Tab can reach it, and it hands focus to the active tag,
  // or to the first enabled one. A pointer never focuses it, but a click on its empty space makes
  // the next Tab enter that same tag.
  const container = createRovingContainer({
    getContainer,
    selector: TAG_SELECTOR,
    resolveTarget: (candidates) =>
      candidates.find((candidate) => candidate.id === groupCtx.tabStopId) ?? candidates[0],
    onEnter: (target) => groupCtx.setActiveId(target.id)
  });

  // `Home`/`PageUp` and `End`/`PageDown` move to the first and the last tag. What a key does to the
  // selection is decided in one place (see `getSelectionIntent`): the keys that extend it select
  // from the anchor (the last tag selected) to the tag they move to, in multiple mode, and the
  // ones the collection leaves to the browser are not handled.
  const handleKeyDown = createRovingKeydown({
    getContainer,
    selector: TAG_SELECTOR,
    options: NAVIGATION_OPTIONS,
    // A range never wraps from one end of the list to the other.
    wrapAround: (e) => resolveSelectionIntent(e) !== "extend",
    acceptsModifiedKey: (e) => resolveSelectionIntent(e) !== "none",
    onMove: (target, e, candidates) => {
      groupCtx.setActiveId(target.id);
      if (resolveSelectionIntent(e) === "extend") groupCtx.extendSelectionTo(target.id, candidates);
    }
  });

  return {
    /** The event props of the list, ready to be spread. */
    props: {
      onmousedown: container.handleMouseDown,
      onfocusin: container.handleFocusIn,
      onkeydown: handleKeyDown
    },
    /** Must run when the list is destroyed. */
    destroy: container.destroy
  };
}
