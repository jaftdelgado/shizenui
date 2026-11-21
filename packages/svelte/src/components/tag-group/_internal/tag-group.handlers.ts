import type { TagGroupContext } from "./tag-group.context.js";
import { TAG_SELECTOR } from "./tag-group.constants.js";
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
    onEnter: (target) => groupCtx.setActiveId(target.id)
  });

  const handleKeyDown = createRovingKeydown({
    getContainer,
    selector: TAG_SELECTOR,
    options: NAVIGATION_OPTIONS,
    wrapAround: true,
    onMove: (target) => groupCtx.setActiveId(target.id)
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
