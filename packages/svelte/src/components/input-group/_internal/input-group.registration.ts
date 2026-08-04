export interface InputGroupControlRegistrationOptions {
  readonly onControlChange: (control: HTMLInputElement | HTMLTextAreaElement | null) => void;
}

export function createInputGroupControlRegistration(
  options: InputGroupControlRegistrationOptions
): {
  register(ownerId: string, control: HTMLInputElement | HTMLTextAreaElement | null): void;
  unregister(ownerId: string): void;
} {
  let activeOwnerId: string | null = null;

  function register(ownerId: string, control: HTMLInputElement | HTMLTextAreaElement | null): void {
    activeOwnerId = ownerId;
    options.onControlChange(control);
  }

  function unregister(ownerId: string): void {
    if (activeOwnerId !== ownerId) return;

    activeOwnerId = null;
    options.onControlChange(null);
  }

  return { register, unregister };
}
