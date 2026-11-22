import { isMac } from "./platform.js";

/**
 * Whether the `Ctrl` of the platform is pressed: `⌘` on macOS, `Ctrl` elsewhere, as the
 * `isCtrlKeyPressed` of React Aria.
 */
export function isCtrlKeyPressed(e: KeyboardEvent): boolean {
  return isMac() ? e.metaKey : e.ctrlKey;
}

function isHomeOrEnd(e: KeyboardEvent): boolean {
  return e.key === "Home" || e.key === "End";
}

/** `Ctrl+Shift+Home`/`End` (`⌘` on macOS) select up to the first or the last item. */
export function isSelectToEdgeKey(e: KeyboardEvent): boolean {
  return isHomeOrEnd(e) && e.shiftKey && !e.altKey && isCtrlKeyPressed(e);
}

/**
 * `Ctrl` with an arrow (and `Shift`, optionally) moves as the arrow alone, as in React Aria. Only
 * `Ctrl`: `⌘` with an arrow belongs to the browser on macOS (e.g. `⌘+←` goes back).
 */
export function isCtrlArrowKey(e: KeyboardEvent): boolean {
  return e.ctrlKey && !e.metaKey && !e.altKey && e.key.startsWith("Arrow");
}

/** The modified keys of a collection that are still handled instead of left to the browser. */
export function isCollectionShortcut(e: KeyboardEvent): boolean {
  return isSelectToEdgeKey(e) || isCtrlArrowKey(e);
}

/**
 * Whether a move extends the selection, as in React Aria: `Shift` with the arrows (`Ctrl` too, or
 * not), `PageUp` or `PageDown`, and `Ctrl+Shift+Home`/`End`. `Shift+Home`/`End` only move focus.
 */
export function extendsSelection(e: KeyboardEvent): boolean {
  return e.shiftKey && (!isHomeOrEnd(e) || isSelectToEdgeKey(e));
}

/**
 * What a key press does to the selection of a collection, besides moving focus:
 * - `"move"`: it only moves focus;
 * - `"extend"`: it moves focus and extends the selection from the anchor to the item it reaches;
 * - `"none"`: the collection leaves the key to the browser (e.g. `Alt+ArrowLeft` goes back).
 */
export type SelectionIntent = "move" | "extend" | "none";

/**
 * Decides the selection intent of a key press. Another selection behavior (e.g. one where moving
 * also selects) is another resolver, not a change to the handlers that use it.
 */
export type SelectionIntentResolver = (e: KeyboardEvent) => SelectionIntent;

/**
 * The selection intent of a key press when moving focus does not change the selection: keys with
 * `Ctrl`, `Meta` or `Alt` belong to the browser, except the collection shortcuts; the keys of
 * `extendsSelection` extend it; the rest only move.
 */
export function getSelectionIntent(e: KeyboardEvent): SelectionIntent {
  if ((e.altKey || e.ctrlKey || e.metaKey) && !isCollectionShortcut(e)) return "none";
  return extendsSelection(e) ? "extend" : "move";
}
