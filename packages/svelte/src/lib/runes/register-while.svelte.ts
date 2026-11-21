/**
 * Registers with a parent while `active()` is true, for registrations that depend on something
 * reactive (a condition that appears and disappears).
 *
 * The initial state is registered synchronously while the component initializes, so it also
 * exists on the server, where effects do not run. The effect then follows later changes and
 * unregisters on cleanup. Registries are idempotent, so the effect's first run registering again
 * is harmless.
 *
 * Must be called at the top level of a Svelte component.
 */
export function registerWhile(
  active: () => boolean,
  register: () => void,
  unregister: () => void
): void {
  if (active()) register();

  $effect.pre(() => {
    if (active()) register();

    return unregister;
  });
}
