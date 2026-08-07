function isActivationKey(key: string): boolean {
  return key === "Enter" || key === " ";
}

export function createButtonHandlers(options: { getDisabled: () => boolean }) {
  const { getDisabled } = options;

  function handleMouseDown(e: MouseEvent & { currentTarget: HTMLButtonElement }): void {
    if (getDisabled()) return;
    e.currentTarget.setAttribute("data-pressed", "true");
  }

  function handleMouseUp(e: MouseEvent & { currentTarget: HTMLButtonElement }): void {
    e.currentTarget.removeAttribute("data-pressed");
  }

  function handleMouseLeave(e: MouseEvent & { currentTarget: HTMLButtonElement }): void {
    e.currentTarget.removeAttribute("data-pressed");
  }

  function handleKeydown(e: KeyboardEvent & { currentTarget: HTMLButtonElement }): void {
    if (!isActivationKey(e.key) || getDisabled()) return;

    e.preventDefault();
    if (e.repeat) return;

    e.currentTarget.setAttribute("data-pressed", "true");
  }

  function handleKeyup(e: KeyboardEvent & { currentTarget: HTMLButtonElement }): void {
    if (!isActivationKey(e.key)) return;
    if (!e.currentTarget.hasAttribute("data-pressed")) return;

    e.currentTarget.removeAttribute("data-pressed");
    if (getDisabled()) return;

    e.currentTarget.click();
  }

  function handleBlur(e: FocusEvent & { currentTarget: HTMLButtonElement }): void {
    e.currentTarget.removeAttribute("data-pressed");
  }

  return {
    handleMouseDown,
    handleMouseUp,
    handleMouseLeave,
    handleKeydown,
    handleKeyup,
    handleBlur
  };
}

export type ButtonHandlers = ReturnType<typeof createButtonHandlers>;
