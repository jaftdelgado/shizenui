const INTERACTIVE_SELECTOR = [
  "button",
  "a",
  "input",
  "textarea",
  "select",
  "summary",
  "[contenteditable='true']",
  "[tabindex]:not([tabindex='-1'])",
  "[role='button']",
  "[role='link']",
  "[role='checkbox']",
  "[role='switch']",
  "[role='menuitem']"
].join(", ");

export function createInputGroupHandlers(options: {
  getInputRef: () => HTMLInputElement | HTMLTextAreaElement | null;
  getDisabled: () => boolean;
}) {
  const { getInputRef, getDisabled } = options;

  function handleContainerClick(e: MouseEvent & { currentTarget: HTMLDivElement }): void {
    if (getDisabled()) return;

    const target = e.target;
    if (!(target instanceof Element)) return;

    const isInteractive = target.closest(INTERACTIVE_SELECTOR);

    if (isInteractive) return;

    getInputRef()?.focus();
  }

  return { handleContainerClick };
}

export type InputGroupHandlers = ReturnType<typeof createInputGroupHandlers>;
