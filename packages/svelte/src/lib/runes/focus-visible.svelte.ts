export function createFocusVisible() {
  let isMouseInteraction = false;
  let isRecentlyVisible = false;
  let isFocusVisible = $state(false);

  $effect(() => {
    function onVisibilityChange() {
      if (document.visibilityState === "visible") {
        isRecentlyVisible = true;
        setTimeout(() => (isRecentlyVisible = false), 500);
      }
    }

    function onMouseUp() {
      setTimeout(() => (isMouseInteraction = false), 0);
    }

    document.addEventListener("visibilitychange", onVisibilityChange);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      document.removeEventListener("mouseup", onMouseUp);
    };
  });

  return {
    get isFocusVisible() {
      return isFocusVisible;
    },
    onMouseDown() {
      isMouseInteraction = true;
    },
    onKeyDown() {
      isMouseInteraction = false;
    },
    onFocus() {
      if (!isRecentlyVisible) isFocusVisible = !isMouseInteraction;
    },
    onBlur() {
      isFocusVisible = false;
    }
  };
}
