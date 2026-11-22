import type { TagGroupListApi } from "./tag-group.context.js";
import { TAG_SELECTOR } from "./tag-group.constants.js";
import {
  createRovingContainer,
  createRovingKeydown,
  extendsSelection,
  isCollectionShortcut
} from "../../../lib/utils/index.js";

const NAVIGATION_OPTIONS = {
  orientation: "horizontal",
  allowCrossAxis: true,
  includeHomeEnd: true,
  includePageUpDown: true
} as const;

export function createTagGroupListHandlers(options: {
  getContainer: () => HTMLDivElement | null;
  groupCtx: Pick<TagGroupListApi, "tabStopId" | "setActiveId" | "extendSelectionTo">;
}) {
  const { getContainer, groupCtx } = options;

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

  // `Home`/`PageUp` and `End`/`PageDown` move to the first and the last tag. The moves that extend
  // the selection (see `extendsSelection`) select from the anchor (the last tag selected) to the
  // tag they move to, in multiple mode. A range never wraps from one end of the list to the other.
  const handleKeyDown = createRovingKeydown({
    getContainer,
    selector: TAG_SELECTOR,
    options: NAVIGATION_OPTIONS,
    wrapAround: (e) => !e.shiftKey,
    acceptsModifiedKey: isCollectionShortcut,
    onMove: (target, e, candidates) => {
      groupCtx.setActiveId(target.id);
      if (extendsSelection(e)) groupCtx.extendSelectionTo(target.id, candidates);
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
