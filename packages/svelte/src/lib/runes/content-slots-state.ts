import type { ContentSlotContextValue } from "../contexts/content-slot.context.js";
import { createIdRegistry } from "./id-registry.svelte.js";

/** The read-only side of {@link ContentSlotsState}: what a component reads to build its aria. */
export interface ContentSlotsField {
  /** Ids derived from the owner id; `undefined` when there is no owner. */
  readonly labelId: string | undefined;
  readonly descriptionId: string | undefined;
  readonly errorId: string | undefined;
  /** Whether a Label, Description or FieldError is currently registered. */
  readonly hasLabel: boolean;
  readonly hasDescription: boolean;
  readonly hasError: boolean;
  /** The id for `aria-describedby`: the error id if there is one, else the description id. */
  readonly describedBy: string | undefined;
}

/** The field of an owner that has no content slots. Used by NOOP contexts. */
export const EMPTY_CONTENT_SLOTS: ContentSlotsField = Object.freeze({
  labelId: undefined,
  descriptionId: undefined,
  errorId: undefined,
  hasLabel: false,
  hasDescription: false,
  hasError: false,
  describedBy: undefined
});

/**
 * The label, description and error of a field-like component: who registered, the ids they
 * should render with, and the `aria-describedby` rule. It is also the value of the ContentSlot
 * context, so the registrations of the child Label, Description and FieldError land here.
 *
 * `describedBy` has two phases, and whoever builds the class decides which one it is in through
 * `mounted` (see `createMounted`). Until the owner has mounted (on the server, and in the first
 * client render, so both produce the same markup) it is optimistic: it comes from `invalid`, not
 * from the registries, because the server renders top to bottom and a Description or FieldError
 * that comes after the list in the markup has not registered yet when the list is written. Once
 * mounted it follows what is registered. The price: if the consumer rendered neither a
 * Description nor a FieldError, the server markup references an id that does not exist until the
 * component hydrates; assistive technology ignores such a reference. `labelId` and the `has...`
 * getters are not optimistic: they only reflect the registries.
 *
 * The `has...` getters are reactive because the registries are. The register methods are readonly
 * arrow fields so they can be destructured or passed as they are.
 */
export class ContentSlotsState implements ContentSlotContextValue, ContentSlotsField {
  readonly #id: () => string;
  readonly #invalid: () => boolean;
  readonly #mounted: () => boolean;

  readonly #labelIds = createIdRegistry();
  readonly #descriptionIds = createIdRegistry();
  readonly #errorIds = createIdRegistry();

  constructor(options: { id: () => string; invalid: () => boolean; mounted: () => boolean }) {
    this.#id = options.id;
    this.#invalid = options.invalid;
    this.#mounted = options.mounted;
  }

  readonly registerLabel = this.#labelIds.register;
  readonly unregisterLabel = this.#labelIds.unregister;
  readonly registerDescription = this.#descriptionIds.register;
  readonly unregisterDescription = this.#descriptionIds.unregister;
  readonly registerError = this.#errorIds.register;
  readonly unregisterError = this.#errorIds.unregister;

  get labelId(): string {
    return `${this.#id()}-label`;
  }

  get descriptionId(): string {
    return `${this.#id()}-description`;
  }

  get errorId(): string {
    return `${this.#id()}-error`;
  }

  get hasLabel(): boolean {
    return this.#labelIds.size > 0;
  }

  get hasDescription(): boolean {
    return this.#descriptionIds.size > 0;
  }

  get hasError(): boolean {
    return this.#errorIds.size > 0;
  }

  get describedBy(): string | undefined {
    if (!this.#mounted()) return this.#invalid() ? this.errorId : this.descriptionId;
    if (this.hasError) return this.errorId;
    if (this.hasDescription) return this.descriptionId;
    return undefined;
  }
}
