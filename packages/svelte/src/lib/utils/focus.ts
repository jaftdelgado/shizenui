/**
 * The elements a press can focus. `[tabindex]` covers the items of a roving container, which have
 * `tabindex="-1"` when they are not the tab stop. A disabled form control is never focusable, even
 * with a `tabindex`.
 */
export const FOCUSABLE_SELECTOR = [
  "a[href]",
  "area[href]",
  "button:not(:disabled)",
  "input:not(:disabled)",
  "select:not(:disabled)",
  "textarea:not(:disabled)",
  "iframe",
  "summary",
  "audio[controls]",
  "video[controls]",
  '[contenteditable]:not([contenteditable="false"])',
  "[tabindex]:not(:disabled)"
].join(",");

/**
 * The focused element in the root of `node`: its document or, inside a shadow tree, its shadow
 * root. A shadow host is returned as is, without looking into it (see `getDeepActiveElement`).
 */
export function getRootActiveElement(node: Node): Element | null {
  const root = node.getRootNode();
  return root instanceof Document || root instanceof ShadowRoot ? root.activeElement : null;
}

/** The element that has focus in `doc`, going into the open shadow roots down to the innermost one. */
export function getDeepActiveElement(doc: Document): HTMLElement | null {
  let active = doc.activeElement;
  while (active?.shadowRoot?.activeElement) active = active.shadowRoot.activeElement;
  return active instanceof HTMLElement ? active : null;
}

/**
 * Whether an event that reached `boundary` came from something focusable inside it: a child that
 * handles the event itself (the remove button of a tag, a consumer's input or link). `boundary`
 * does not count, even when it is focusable itself.
 */
export function isFromFocusableChild(target: EventTarget | null, boundary: Element): boolean {
  if (!(target instanceof Element)) return false;
  const focusable = target.closest(FOCUSABLE_SELECTOR);
  return focusable !== null && focusable !== boundary && boundary.contains(focusable);
}

/** The elements of `container` that match `selector`, in DOM order. */
export function getRovingCandidates<T extends HTMLElement>(
  container: HTMLElement,
  selector: string
): T[] {
  return Array.from(container.querySelectorAll<T>(selector));
}
