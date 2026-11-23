import { onDestroy } from "svelte";
import { isModifierKey } from "../utils/keyboard.js";

const isBrowser = typeof window !== "undefined" && typeof document !== "undefined";

type Subscriber = () => void;

interface GlobalModalityState {
  isPointer: boolean;
  isRecentlyVisible: boolean;
  /** Window focus and blur, page visibility. */
  resetSubscribers: Set<Subscriber>;
  /** A `pointerdown`. */
  pointerSubscribers: Set<Subscriber>;
  /** A `keydown` of a key that is not only a modifier. */
  keySubscribers: Set<Subscriber>;
  /** How many components that called `createInteractionModality` are alive. */
  users: number;
  cleanup: () => void;
}

let globalState: GlobalModalityState | null = null;
let recentlyVisibleTimeout: ReturnType<typeof setTimeout> | null = null;

function getGlobalState(): GlobalModalityState {
  if (globalState) return globalState;

  const state: GlobalModalityState = {
    isPointer: false,
    isRecentlyVisible: false,
    resetSubscribers: new Set(),
    pointerSubscribers: new Set(),
    keySubscribers: new Set(),
    users: 0,
    cleanup: () => {}
  };

  function notify(subscribers: Set<Subscriber>) {
    // A copy: a subscriber may subscribe or unsubscribe while it runs.
    for (const subscriber of [...subscribers]) {
      subscriber();
    }
  }

  function notifyReset() {
    notify(state.resetSubscribers);
  }

  function markRecentlyVisible() {
    state.isRecentlyVisible = true;

    if (recentlyVisibleTimeout) {
      clearTimeout(recentlyVisibleTimeout);
    }

    recentlyVisibleTimeout = setTimeout(() => {
      state.isRecentlyVisible = false;
      recentlyVisibleTimeout = null;
    }, 500);
  }

  function onVisibilityChange() {
    if (document.visibilityState === "visible") {
      markRecentlyVisible();
      notifyReset();
    } else {
      notifyReset();
    }
  }

  function onWindowBlur() {
    notifyReset();
  }

  function onWindowFocus() {
    markRecentlyVisible();
    notifyReset();
  }

  // Delay reset so focus events triggered by mouse interaction
  // still detect pointer modality correctly. It changes the modality but is not an interaction,
  // so it notifies nobody.
  function onMouseUp() {
    setTimeout(() => (state.isPointer = false), 0);
  }

  // A cancelled pointer (a touch that turns into a scroll, a mouse that starts a drag) is followed
  // by no `mouseup` and no focus change, so nothing else would end the pointer modality. It is not
  // an interaction either, so it notifies nobody.
  function onPointerCancel() {
    state.isPointer = false;
  }

  function onPointerDown() {
    state.isPointer = true;
    notify(state.pointerSubscribers);
  }

  function onKeyDown(e: KeyboardEvent) {
    if (isModifierKey(e.key)) return;
    state.isPointer = false;
    notify(state.keySubscribers);
  }

  if (isBrowser) {
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("blur", onWindowBlur);
    window.addEventListener("focus", onWindowFocus);
    document.addEventListener("mouseup", onMouseUp);
    // The modality is decided by any interaction, not only the ones that happen on a component:
    // a click on a container can move focus to one of its items. Capture, so these run before any
    // handler and also receive the events that one stops with `stopPropagation()`.
    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("pointercancel", onPointerCancel, true);
    document.addEventListener("keydown", onKeyDown, true);

    state.cleanup = () => {
      if (recentlyVisibleTimeout) {
        clearTimeout(recentlyVisibleTimeout);
        recentlyVisibleTimeout = null;
      }
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("blur", onWindowBlur);
      window.removeEventListener("focus", onWindowFocus);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("pointercancel", onPointerCancel, true);
      document.removeEventListener("keydown", onKeyDown, true);
    };
  }

  globalState = state;
  return state;
}

/** What `createInteractionModality` returns. */
export type InteractionModality = ReturnType<typeof createInteractionModality>;

/**
 * The input modality of the page, shared by every component: whether the last interaction came
 * from a pointer or from the keyboard.
 *
 * Call it while the component initializes (it registers an `onDestroy`). The listeners live on the
 * `document` and are shared: the first caller adds them, the last one to be destroyed removes them.
 *
 * `isPointer` is true from a `pointerdown` until a `keydown` (not one of a modifier alone), a
 * `pointercancel`, or the end of the task after a `mouseup`. The reset waits that task because the
 * `mousedown` that moves focus can arrive after the `pointerup` (touch), and its `focusin` still
 * has to see the pointer modality.
 */
export function createInteractionModality() {
  const state = getGlobalState();
  const subscriptions = new Set<() => void>();

  function subscribe(set: Set<Subscriber>, subscriber: Subscriber): () => void {
    set.add(subscriber);
    const unsubscribe = () => {
      set.delete(subscriber);
      subscriptions.delete(unsubscribe);
    };
    subscriptions.add(unsubscribe);
    return unsubscribe;
  }

  state.users++;

  onDestroy(() => {
    for (const unsubscribe of [...subscriptions]) unsubscribe();

    state.users--;
    if (state.users === 0) {
      if (isBrowser) state.cleanup();
      globalState = null;
    }
  });

  return {
    /** Whether the interaction in progress comes from a pointer (mouse, touch or pen). */
    get isPointer() {
      return state.isPointer;
    },
    /** Whether the page just became visible again or the window just got focus (500 ms). */
    get isRecentlyVisible() {
      return state.isRecentlyVisible;
    },
    /**
     * Runs `subscriber` when the window loses or gets focus, or the page changes visibility.
     * Returns the function that ends the subscription; it also ends when the component is
     * destroyed.
     */
    onReset(subscriber: Subscriber): () => void {
      return subscribe(state.resetSubscribers, subscriber);
    },
    /**
     * Runs `subscriber` on every `pointerdown` of the page, wherever it lands and whether or not
     * focus moves. Returns the function that ends the subscription; it also ends when the
     * component is destroyed.
     */
    onPointerDown(subscriber: Subscriber): () => void {
      return subscribe(state.pointerSubscribers, subscriber);
    },
    /**
     * Runs `subscriber` on every `keydown` of the page, except the ones of keys that only modify
     * others (`Shift`, `Control`, `Alt`, `Meta`). Returns the function that ends the
     * subscription; it also ends when the component is destroyed.
     */
    onKeyDown(subscriber: Subscriber): () => void {
      return subscribe(state.keySubscribers, subscriber);
    }
  };
}
