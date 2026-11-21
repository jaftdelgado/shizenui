import { untrack } from "svelte";
import { SvelteMap } from "svelte/reactivity";

/** What the group needs to know about an item to decide whether it can hold the tab stop. */
export interface RovingFocusItem {
  getDisabled: () => boolean;
}

/**
 * Registry of items and the last active one, for a roving tab stop. Its methods are readonly
 * arrow fields so they can be destructured.
 *
 * The active item is remembered by its id and also by the registration object it had when it was
 * activated. The object does not change during the life of an item, so if the item registers
 * again under a different id (its `id` prop changed), it is still the active one and `focusedId`
 * follows it to the new id. The object of the last active item is kept even if the item is
 * removed, until another one is activated.
 */
export class RovingFocusState {
  // Mutated in place on purpose: copying the collection on every register/unregister is O(N²)
  // for large lists. SvelteMap keeps reads reactive without the copy, including when a
  // remounted item replaces the entry of the same id.
  #items = new SvelteMap<string, RovingFocusItem>();
  #activeId: string | undefined = $state(undefined);
  // Plain, not reactive: it is only read by `register`, and `#activeId` is what drives the UI.
  #activeEntry: RovingFocusItem | undefined;
  /** The last focused item, or undefined if there is none or it is gone or disabled. */
  #focusedId = $derived.by(() => {
    const id = this.#activeId;
    if (id === undefined) return undefined;
    const entry = this.#items.get(id);
    return entry && !entry.getDisabled() ? id : undefined;
  });

  get focusedId(): string | undefined {
    return this.#focusedId;
  }

  readonly isRegistered = (id: string): boolean => this.#items.has(id);

  readonly register = (id: string, entry: RovingFocusItem): void => {
    untrack(() => {
      this.#items.set(id, entry);
      if (entry === this.#activeEntry) {
        // The active item came back under another id: follow it.
        this.#activeId = id;
      } else if (id === this.#activeId) {
        // A remounted item took over the active id with a new registration.
        this.#activeEntry = entry;
      }
    });
  };

  readonly unregister = (id: string, entry: RovingFocusItem): void => {
    untrack(() => {
      // A remounted item may already have registered the same id with a new entry.
      if (this.#items.get(id) === entry) this.#items.delete(id);
    });
  };

  readonly isActive = (id: string): boolean => id === this.#focusedId;

  readonly setActiveId = (id: string | undefined): void => {
    this.#activeId = id;
    this.#activeEntry = id === undefined ? undefined : untrack(() => this.#items.get(id));
  };
}
