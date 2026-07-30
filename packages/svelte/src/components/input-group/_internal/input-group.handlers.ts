export function createInputGroupHandlers(options: {
  getInputRef: () => HTMLInputElement | HTMLTextAreaElement | null;
  getDisabled: () => boolean;
}) {
  const { getInputRef, getDisabled } = options;

  function handleContainerClick(e: MouseEvent & { currentTarget: HTMLDivElement }): void {
    if (getDisabled()) return;

    const target = e.target;
    if (!(target instanceof Element)) return;

    const isInteractive = target.closest(
      [
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
      ].join(", ")
    );

    if (isInteractive) return;

    getInputRef()?.focus();
  }

  return { handleContainerClick };
}

export type InputGroupHandlers = ReturnType<typeof createInputGroupHandlers>;

export function createInputGroupControlHandlers<
  T extends HTMLInputElement | HTMLTextAreaElement
>(options: {
  textFieldCtx: import("../../text-field/_internal/text-field.context.js").TextFieldContextResult;
  getOnInput: () => ((event: InputEvent & { currentTarget: T }) => void) | undefined;
  getOnInvalid: () => ((event: Event & { currentTarget: T }) => void) | undefined;
}) {
  const { textFieldCtx, getOnInput, getOnInvalid } = options;

  function handleInput(event: InputEvent & { currentTarget: T }): void {
    textFieldCtx.reportValidity(event.currentTarget.validity.valid);
    getOnInput()?.(event);
  }

  function handleInvalid(event: Event & { currentTarget: T }): void {
    textFieldCtx.reportInvalid();
    getOnInvalid()?.(event);
  }

  return { handleInput, handleInvalid };
}

export type InputGroupControlHandlers = ReturnType<typeof createInputGroupControlHandlers>;
