// The queries of a TagGroup to the DOM. The `.svelte` files and the handlers call them, never the
// state: it works with ids and values.
import { getRovingCandidates } from "../../../lib/utils/index.js";
import { GROUP_SELECTOR, LIST_SELECTOR, TAG_SELECTOR } from "./tag-group.constants.js";

/** The ids of the enabled tags of `list`, in the order the user sees them. */
export function getListRowIds(list: HTMLElement): string[] {
  return getRovingCandidates<HTMLElement>(list, TAG_SELECTOR).map((row) => row.id);
}

/**
 * Whether `element` sits inside a list that belongs to its own group. A group nested in the list
 * of another group does not count that list for its own tags: an element of the inner group that
 * is outside the inner group's list is not inside its own list, even if it is inside the outer one.
 */
export function isInsideOwnList(element: Element): boolean {
  const list = element.closest(LIST_SELECTOR);
  if (!list) return false;

  const group = element.closest(GROUP_SELECTOR);
  return group === null || group.contains(list);
}
