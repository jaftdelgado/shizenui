import { tick } from "svelte";

/**
 * Synchronizes reactive state with a native <form> `reset` event.
 * Uses $effect internally, so it must be called at the top level of a Svelte component.
 *
 * @param getRef - function returning the current mirror input element (or `null` before mount)
 * @param onReset - callback invoked when the ancestor <form> is reset
 * @param onResetComplete - callback invoked after the browser's native reset algorithm completes
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
  onResetComplete?: () => void;
}): void {
  $effect(() => {
    const el = options.getRef();
    if (!el) return;

    const formEl =
      "form" in el && el.form instanceof HTMLFormElement ? el.form : el.closest("form");

    if (!formEl) return;

    let isActive = true;

    function handleReset(): void {
      options.onReset();

      if (options.onResetComplete) {
        void tick().then(() => {
          if (isActive) options.onResetComplete?.();
        });
      }
    }

    formEl.addEventListener("reset", handleReset);
    return () => {
      isActive = false;
      formEl.removeEventListener("reset", handleReset);
    };
  });
}

/**
 * Keeps a controlled native input synchronized with the baseline used by a
 * component when its ancestor form is reset.
 *
 * Native form reset restores `defaultChecked`, while controlled Svelte inputs
 * may not receive a DOM update when the reactive value already equals the
 * baseline. Updating both properties makes the reset deterministic in either
 * case.
 */
export function syncNativeCheckedReset(
  input: HTMLInputElement | null,
  checked: boolean,
  indeterminate = false
): void {
  if (!input) return;

  input.defaultChecked = checked;
  input.checked = checked;
  input.indeterminate = indeterminate;
}

/**
 * Synchronizes the native checkbox/radio mirrors rendered by a selectable group.
 *
 * Group children derive their checked state through context, so their native
 * inputs can otherwise lag behind the group's controlled value during reset.
 */
export function syncNativeGroupSelectionReset(
  container: HTMLElement | null,
  selectedValues: readonly string[]
): void {
  if (!container) return;

  const selected = new Set(selectedValues);

  for (const input of container.querySelectorAll<HTMLInputElement>(
    'input[type="checkbox"][name], input[type="radio"][name]'
  )) {
    syncNativeCheckedReset(input, selected.has(input.value));
  }
}
