import { untrack } from "svelte";

/**
 * Reactive registry of string IDs, used by `*.setup.svelte.ts` files to back
 * ContentSlot-style contexts (label/description/error/title/etc).
 *
 * Centralizes two invariants required by the architecture standard:
 *
 * 1. The backing Set is always replaced immutably (never mutated in place),
 *    per §6.5 / §14.8 of the component standard.
 * 2. `register`/`unregister` wrap their read+write in `untrack()`.
 *
 * Why (2) is required: these methods are typically invoked synchronously
 * inside a consumer component's own `$effect` (Label, Description,
 * FieldError, Title, ...):
 *
 *   $effect(() => {
 *     ctx.registerDescription(id);
 *     return () => ctx.unregisterDescription(id);
 *   });
 *
 * If `register`/`unregister` read the Set (`ids.has(id)`) without
 * `untrack`, that read is tracked as a dependency of the *caller's*
 * `$effect`. Since the same call also writes the Set right after, the
 * effect ends up depending on state it just wrote, causing Svelte to
 * reschedule it indefinitely and throw `effect_update_depth_exceeded`.
 * See standard §14.9.
 *
 * Wrapping the body in `untrack()` prevents the internal read from being
 * captured by whatever external effect is calling into the registry, while
 * still allowing external `$derived`/effects that read `.size`/`.ids`/`.has`
 * to react normally to registry changes.
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
  let ids = $state(new Set<string>());

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
      untrack(() => {
        if (ids.has(id)) return;
        const next = new Set(ids);
        next.add(id);
        ids = next;
      });
    },
    unregister(id: string) {
      untrack(() => {
        if (!ids.has(id)) return;
        const next = new Set(ids);
        next.delete(id);
        ids = next;
      });
    }
  };
}
