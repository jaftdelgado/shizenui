/**
 * Synchronizes reactive state with a native <form> `reset` event.
 * Uses $effect internally, so it must be called at the top level of a Svelte component.
 *
 * @param getRef - function returning the current mirror input element (or `null` before mount)
 * @param onReset - callback invoked when the ancestor <form> is reset
 *
 * @example
 * syncFormReset({
 *   getRef: () => inputRef,
 *   onReset: () => (checked = defaultChecked)
 * });
 */
export function syncFormReset(options: {
  getRef: () => HTMLElement | null;
  onReset: () => void;
}): void {
  $effect(() => {
    const el = options.getRef();
    if (!el) return;

    const formEl =
      "form" in el && el.form instanceof HTMLFormElement ? el.form : el.closest("form");

    if (!formEl) return;

    function handleReset(): void {
      options.onReset();
    }

    formEl.addEventListener("reset", handleReset);
    return () => formEl.removeEventListener("reset", handleReset);
  });
}
