import type { TextFieldControl } from "./text-field.context.js";

export interface TextFieldControlRegistrationOptions {
  readonly onControlChange: (control: TextFieldControl | null) => void;
  readonly onAccessibleNameChange: (hasAccessibleName: boolean) => void;
  readonly onMultipleControl: () => void;
}

function hasAccessibleName(control: TextFieldControl | null): boolean {
  return (
    Boolean(control?.getAttribute("aria-label")?.trim()) ||
    Boolean(control?.getAttribute("aria-labelledby")?.trim())
  );
}

export function createTextFieldControlRegistration(options: TextFieldControlRegistrationOptions): {
  register(ownerId: string, control: TextFieldControl | null): void;
  unregister(ownerId: string): void;
} {
  let activeOwnerId: string | null = null;

  function register(ownerId: string, control: TextFieldControl | null): void {
    if (activeOwnerId !== null && activeOwnerId !== ownerId) {
      options.onMultipleControl();
      return;
    }

    activeOwnerId = ownerId;
    options.onControlChange(control);
    options.onAccessibleNameChange(hasAccessibleName(control));
  }

  function unregister(ownerId: string): void {
    if (activeOwnerId !== ownerId) return;

    activeOwnerId = null;
    options.onControlChange(null);
    options.onAccessibleNameChange(false);
  }

  return { register, unregister };
}
