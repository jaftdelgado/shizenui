import { createContext } from "svelte";

/**
 * Creates a context whose consumers also work when no provider exists.
 *
 * Svelte's `createContext` getter throws if nothing set the context. Compound components that can
 * render outside their parent (a Tag outside a TagGroup) would have to wrap every read in a
 * try/catch. This does it once: `use()` returns the provided context, or `fallback` when there is
 * none.
 *
 * The pattern it supports: a single interface with an `exists` flag, provided as `exists: true`
 * by the parent, and a frozen NOOP object as `fallback` (`exists: false`, inert values and
 * methods that do nothing). Consumers read the context unconditionally and branch on `exists`
 * where it matters.
 *
 * Like `createContext`, `use()` and `set()` must be called while a component initializes.
 *
 * @param fallback - what `use()` returns when no provider set the context. Freeze it.
 * @returns the `[use, set]` pair
 */
export function createOptionalContext<T>(fallback: T): [use: () => T, set: (context: T) => T] {
  const [get, set] = createContext<T>();

  function use(): T {
    try {
      return get() ?? fallback;
    } catch {
      return fallback;
    }
  }

  return [use, set];
}
