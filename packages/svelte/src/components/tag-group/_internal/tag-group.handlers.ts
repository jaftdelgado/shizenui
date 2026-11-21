import type { TagGroupContext } from "./tag-group.context.js";
import { TAG_SELECTOR } from "./tag-group.constants.js";
import { getListTagIds } from "./tag-group.dom.js";
import { createRovingContainer, createRovingKeydown } from "../../../lib/utils/index.js";

const NAVIGATION_OPTIONS = {
  orientation: "horizontal",
  allowCrossAxis: true,
  includeHomeEnd: true
} as const;

export function createTagGroupListHandlers(options: {
  getContainer: () => HTMLDivElement | null;
  groupCtx: TagGroupContext;
}) {
  const { getContainer, groupCtx } = options;

  // The list is focusable itself so that Tab can reach it, and it hands focus to the active tag,
  // or to the first enabled one. A pointer never focuses it, but a click on its empty space makes
  // the next Tab enter that same tag.
  const container = createRovingContainer({
    getContainer,
    selector: TAG_SELECTOR,
    resolveTarget: (candidates) =>
      candidates.find((candidate) => candidate.id === groupCtx.focusedId) ?? candidates[0],
    onEnter: (target) => {
      groupCtx.setActiveId(target.id);
      groupCtx.setSelectionAnchor(target.id);
    }
  });

  // With `Shift`, the arrows, `Home` and `End` extend the selection to the tag they move to
  // (multiple mode), from the tag the extension started on; without it, that tag becomes the
  // anchor of a Shift+click. A range never wraps from one end of the list to the other.
  const handleKeyDown = createRovingKeydown({
    getContainer,
    selector: TAG_SELECTOR,
    options: NAVIGATION_OPTIONS,
    wrapAround: (e) => !e.shiftKey,
    onMove: (target, e) => {
      groupCtx.setActiveId(target.id);
      if (!e.shiftKey) {
        groupCtx.setSelectionAnchor(target.id);
        return;
      }
      // The key was pressed on the tag focus just left (or on something inside it).
      const origin = e.target instanceof Element ? e.target.closest(TAG_SELECTOR) : null;
      groupCtx.extendSelectionTo(target.id, getListTagIds(target), origin?.id);
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
