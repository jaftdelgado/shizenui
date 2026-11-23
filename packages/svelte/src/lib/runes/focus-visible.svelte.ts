import { createInteractionModality } from "./interaction-modality.svelte.js";

/** What `createFocusVisible` returns. */
export type FocusVisible = ReturnType<typeof createFocusVisible>;

/**
 * Whether the focus ring of an element is visible. It follows the interaction modality: the ring
 * shows when the element gets focus from the keyboard, goes away with any pointer interaction
 * (even if focus does not move), and comes back with a key while the element still has focus.
 *
 * It only listens to the page while the element has focus: the ring is hidden on blur, so the
 * interactions that happen without focus cannot change it. A page with many of these elements
 * then runs one listener per interaction, not one per element.
 */
export function createFocusVisible() {
  let isFocusVisible = $state(false);
  /** Ends the subscriptions of the focused element; `undefined` while it has no focus. */
  let stopListening: (() => void) | undefined;

  const modality = createInteractionModality();

  function listen(): void {
    if (stopListening) return;

    const hide = () => {
      isFocusVisible = false;
    };
    const unsubscribers = [
      modality.onReset(hide),
      modality.onPointerDown(hide),
      modality.onKeyDown(() => {
        isFocusVisible = true;
      })
    ];

    stopListening = () => {
      for (const unsubscribe of unsubscribers) unsubscribe();
      stopListening = undefined;
    };
  }

  return {
    get isFocusVisible() {
      return isFocusVisible;
    },
    onFocus() {
      listen();
      if (!modality.isRecentlyVisible) isFocusVisible = !modality.isPointer;
    },
    onBlur() {
      stopListening?.();
      isFocusVisible = false;
    }
  };
}
