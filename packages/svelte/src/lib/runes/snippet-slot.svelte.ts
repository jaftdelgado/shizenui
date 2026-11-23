import { untrack } from "svelte";
import type { Snippet } from "svelte";
import { devWarn } from "../utils/dev-warn.js";

export interface SnippetSlot<T extends unknown[] = []> {
  /** The registered snippet, if any. */
  readonly current: Snippet<T> | undefined;
  /** Registers `snippet` unless one is registered already. Returns the function that withdraws it. */
  readonly register: (snippet: Snippet<T>) => () => void;
}

/**
 * A slot that a child fills with its markup (a snippet) for the parent to render somewhere else.
 * The child is declared among the parent's children, but what it renders is up to the parent: the
 * parent places the markup where it needs it. The snippet still belongs to the declaration: its
 * props, its children and its `bind:ref` stay there.
 *
 * The declaration registers while it initializes, so the slot is filled before the parent renders
 * the markup that follows its children, on the server too. Only one snippet per slot: the first
 * one wins, and an extra one logs `duplicate` in development.
 */
export function createSnippetSlot<T extends unknown[] = []>(duplicate: {
  component: string;
  message: string;
}): SnippetSlot<T> {
  // Raw: the snippet is compared by identity when it is withdrawn.
  let current = $state.raw<Snippet<T> | undefined>(undefined);

  return {
    get current() {
      return current;
    },
    register: (snippet) => {
      // Called while the declaration initializes, maybe inside one of its effects: reading the slot
      // must not become a dependency of the caller.
      return untrack(() => {
        if (current !== undefined) {
          devWarn(duplicate.component, duplicate.message);
          return () => {};
        }

        current = snippet;
        return () => {
          if (current === snippet) current = undefined;
        };
      });
    }
  };
}
