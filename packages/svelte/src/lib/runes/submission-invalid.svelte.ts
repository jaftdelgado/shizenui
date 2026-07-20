/**
 * Tracks whether a field failed native browser validation (`oninvalid`).
 * Uses $effect internally, so it must be constructed at the top level of a Svelte component.
 *
 * @param isValid - function returning whether the current field state is valid
 *
 * @example
 * const submissionInvalid = new SubmissionInvalidState(() => checkboxState.isChecked);
 *
 * function handleInvalid(): void {
 *   submissionInvalid.set(true);
 * }
 *
 * syncFormReset({
 *   getRef: () => ref,
 *   onReset: () => submissionInvalid.clear()
 * });
 */
export class SubmissionInvalidState {
  #value = $state(false);

  constructor(isValid: () => boolean) {
    $effect(() => {
      if (isValid()) this.#value = false;
    });
  }

  get value(): boolean {
    return this.#value;
  }

  set(next: boolean): void {
    this.#value = next;
  }

  clear(): void {
    this.#value = false;
  }
}
