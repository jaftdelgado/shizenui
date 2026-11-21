import { getRovingCandidates } from "../../../lib/utils/index.js";
import { LIST_SELECTOR, TAG_SELECTOR } from "./tag-group.constants.js";

/**
 * The ids of the enabled tags of the list that contains `element` (or that `element` is), in
 * the order the user sees them. Empty when it is not inside a list.
 */
export function getListTagIds(element: Element): string[] {
  const list = element.closest<HTMLElement>(LIST_SELECTOR);
  if (!list) return [];
  return getRovingCandidates<HTMLElement>(list, TAG_SELECTOR).map((tag) => tag.id);
}
