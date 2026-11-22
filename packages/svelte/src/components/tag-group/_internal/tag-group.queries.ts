import { getRovingCandidates } from "../../../lib/utils/index.js";
import { GROUP_SELECTOR, LIST_SELECTOR, TAG_SELECTOR } from "./tag-group.constants.js";

/** The enabled tags of `list`, in the order the user sees them. */
export function getListRows(list: HTMLElement): HTMLElement[] {
  return getRovingCandidates<HTMLElement>(list, TAG_SELECTOR);
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
