import { onDestroy } from "svelte";

const isBrowser = typeof window !== "undefined" && typeof document !== "undefined";

type Subscriber = () => void;

interface GlobalFocusState {
  isMouseInteraction: boolean;
  isRecentlyVisible: boolean;
  subscribers: Set<Subscriber>;
  cleanup: () => void;
}

let globalState: GlobalFocusState | null = null;
let recentlyVisibleTimeout: ReturnType<typeof setTimeout> | null = null;

function getGlobalState(): GlobalFocusState {
  if (globalState) return globalState;

  const state: GlobalFocusState = {
    isMouseInteraction: false,
    isRecentlyVisible: false,
    subscribers: new Set(),
    cleanup: () => {}
  };

  function notifyBlur() {
    for (const subscriber of state.subscribers) {
      subscriber();
    }
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
      notifyBlur();
    } else {
      notifyBlur();
    }
  }

  function onWindowBlur() {
    notifyBlur();
  }

  function onWindowFocus() {
    markRecentlyVisible();
    notifyBlur();
  }

  // Delay reset so focus events triggered by mouse interaction
  // still detect pointer modality correctly.
  function onMouseUp() {
    setTimeout(() => (state.isMouseInteraction = false), 0);
  }

  if (isBrowser) {
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("blur", onWindowBlur);
    window.addEventListener("focus", onWindowFocus);
    document.addEventListener("mouseup", onMouseUp);

    state.cleanup = () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("blur", onWindowBlur);
      window.removeEventListener("focus", onWindowFocus);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }

  globalState = state;
  return state;
}

export function createFocusVisible() {
  let isFocusVisible = $state(false);

  const state = getGlobalState();

  const subscriber: Subscriber = () => {
    isFocusVisible = false;
  };

  state.subscribers.add(subscriber);

  onDestroy(() => {
    state.subscribers.delete(subscriber);

    if (state.subscribers.size === 0) {
      if (isBrowser) state.cleanup();
      globalState = null;
    }
  });

  return {
    get isFocusVisible() {
      return isFocusVisible;
    },
    onMouseDown() {
      state.isMouseInteraction = true;
    },
    onKeyDown() {
      state.isMouseInteraction = false;
    },
    onFocus() {
      if (!state.isRecentlyVisible) isFocusVisible = !state.isMouseInteraction;
    },
    onBlur() {
      isFocusVisible = false;
    }
  };
}
