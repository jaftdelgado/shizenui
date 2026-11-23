import { untrack } from "svelte";
import { SvelteSet } from "svelte/reactivity";

/**
 * Reactive registry of string IDs, used by `*.setup.svelte.ts` files to back
 * ContentSlot-style contexts (label/description/error/title/etc).
 *
 * Centralizes two invariants:
 *
 * 1. The backing collection is a `SvelteSet` mutated in place, never copied:
 *    copying it on every register/unregister is O(N²) for large lists, and
 *    reads of `.size`/`.ids`/`.has` stay reactive without the copy.
 * 2. `register`/`unregister` wrap their body in `untrack()`.
 *
 * How consumers register (the rule for every parent registry):
 *
 * - Constant for the component's life (a fixed id, no reactive condition):
 *   register synchronously while initializing and unregister in `onDestroy`.
 *   It also exists on the server. (Label)
 * - Depends on a condition that appears and disappears: `registerWhile`
 *   registers the initial state synchronously, then an `$effect.pre` follows
 *   the changes and cleans up. (Description, FieldError)
 * - The identity itself changes (the id of a Tag): `registerKeyed` re-registers
 *   under the new id, and its cleanup removes the id it captured.
 *
 * Why (2) is required: these methods are called from the consumer's own
 * effects or while it initializes, e.g.
 *
 *   $effect.pre(() => {
 *     ctx.registerDescription(id);
 *     return () => ctx.unregisterDescription(id);
 *   });
 *
 * Any read of the set inside `register`/`unregister` would be tracked as a
 * dependency of the *caller's* effect. Since the same call also writes the
 * set, the effect would end up depending on state it just wrote, and Svelte
 * would reschedule it until it throws `effect_update_depth_exceeded`.
 *
 * `untrack()` keeps the registry's own reads out of the caller, while
 * external `$derived`/effects that read `.size`/`.ids`/`.has` still react to
 * registry changes.
 */
export interface IdRegistry {
  /** Number of currently registered ids. */
  readonly size: number;
  /** Space-joined ids, ready to drop into an `aria-*` attribute. */
  readonly ids: string;
  /** Non-reactive-safe membership check (also usable outside an effect). */
  has(id: string): boolean;
  register(id: string): void;
  unregister(id: string): void;
}

export function createIdRegistry(): IdRegistry {
  const ids = new SvelteSet<string>();

  return {
    get size() {
      return ids.size;
    },
    get ids() {
      return [...ids].join(" ");
    },
    has(id: string) {
      return ids.has(id);
    },
    register(id: string) {
      untrack(() => ids.add(id));
    },
    unregister(id: string) {
      untrack(() => ids.delete(id));
    }
  };
}
