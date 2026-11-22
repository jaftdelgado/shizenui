import { getRovingCandidates } from "../../../lib/utils/index.js";
import { TAG_SELECTOR } from "./tag-group.constants.js";

/** The enabled tags of `list`, in the order the user sees them. */
export function getListRows(list: HTMLElement): HTMLElement[] {
  return getRovingCandidates<HTMLElement>(list, TAG_SELECTOR);
}
