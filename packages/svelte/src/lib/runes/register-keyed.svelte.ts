import { untrack } from "svelte";

/**
 * Registers with a parent under a key that can change (the id of an item): it registers under
 * the current key, and when the key changes it unregisters the old one and registers the new one.
 * Only `getKey` is tracked: `register` and `unregister` run untracked, so what they read never
 * becomes a dependency.
 *
 * Unlike `registerWhile`, nothing is registered while the component initializes: effects do not
 * run on the server, so the parent's markup must not depend on these registrations.
 *
 * Must be called at the top level of a Svelte component.
 */
export function registerKeyed<K>(
  getKey: () => K,
  register: (key: K) => void,
  unregister: (key: K) => void
): void {
  $effect.pre(() => {
    const key = getKey();
    untrack(() => register(key));
    return () => untrack(() => unregister(key));
  });
}
