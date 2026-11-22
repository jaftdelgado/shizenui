import type { Snippet } from "svelte";
import { createSnippetSlot } from "../../../lib/runes/index.js";
import { useTagGroupContext } from "../../tag-group/_internal/index.js";
import type {
  TagGroupItemApi,
  TagGroupRegistration,
  TagGroupRemoveScope
} from "../../tag-group/_internal/index.js";
import type { TagContext } from "./tag.context.js";
import type { TagSize, TagVariant } from "./tag.types.js";

export interface TagStateProps {
  value: () => string;
  disabled: () => boolean | undefined;
  id: () => string;
  onRemove: () => (() => void) | undefined;
  /** The tag's element, if it is rendered. */
  getRef: () => HTMLElement | null;
  /**
   * The class of the remove button. The Tag resolves the classes of its slots with its variant and
   * its size; the state only hands this one to the button through the context.
   */
  removeButtonClass: () => string;
  groupContext?: TagGroupItemApi;
}

/**
 * State of a Tag. It is also the tag's context: it is passed as is to `setTagContext`, so the
 * `<Tag.RemoveButton>` reads it.
 */
export class TagState implements TagContext {
  readonly exists = true;

  readonly #props: TagStateProps;

  readonly #groupCtx: TagGroupItemApi;

  /**
   * What the tag tells its group about itself. It is the same object for the whole life of the
   * tag: the group recognizes the tag by it when its id changes (it registers again under the new
   * id) and keeps following it as the active one.
   */
  readonly registration: TagGroupRegistration = {
    getDisabled: () => this.disabled,
    getValue: () => this.value,
    canRemove: () => this.canRemove,
    emitRemove: () => this.#props.onRemove()?.()
  };

  /**
   * `<Tag.RemoveButton>` is declared among the tag's children, but it is not rendered there: it
   * fills this slot with its markup, which the Tag renders after the element that wraps its text.
   * That element names the row and the button (`aria-labelledby`), and a button inside it would
   * add its own name to both. Only one remove button per tag is supported: the first one wins.
   */
  readonly #removeButton = createSnippetSlot({
    component: "Tag.RemoveButton",
    message: "Only one remove button per <Tag> is supported. The extra one is not rendered."
  });

  #isActive = $derived.by(() => this.#groupCtx.isActive(this.#props.id()));
  #isSelected = $derived.by(
    () => this.isSelectable && this.#groupCtx.isSelected(this.#props.value())
  );

  constructor(props: TagStateProps) {
    this.#props = props;
    this.#groupCtx = props.groupContext ?? useTagGroupContext();
  }

  /** Whether the tag sits inside a <TagGroup>. Fixed for the life of the tag. */
  get inGroup(): boolean {
    return this.#groupCtx.exists;
  }

  /** Variant and size given by the group; `undefined` when it gives none, or outside one. */
  get variant(): TagVariant | undefined {
    return this.#groupCtx.variant;
  }

  get size(): TagSize | undefined {
    return this.#groupCtx.size;
  }

  get isActive(): boolean {
    return this.#isActive;
  }

  get disabled(): boolean {
    // A disabled group always wins: disabled={false} on a tag cannot re-enable it.
    return this.#groupCtx.disabled || (this.#props.disabled() ?? false);
  }

  get isSelectable(): boolean {
    return this.#groupCtx.selectionMode !== "none";
  }

  get isInteractive(): boolean {
    return this.isSelectable && !this.disabled;
  }

  get isSelected(): boolean {
    return this.#isSelected;
  }

  get isRemovable(): boolean {
    return Boolean(this.#props.onRemove()) || this.#groupCtx.isRemovable;
  }

  get canRemove(): boolean {
    return this.isRemovable && !this.disabled;
  }

  /** Whether the remove button belongs in the tab sequence (only the active tag of a group). */
  get tabbable(): boolean {
    return !this.inGroup || this.isActive;
  }

  /** The class of the remove button slot, resolved with the variant and the size of the tag. */
  get removeButtonClass(): string {
    return this.#props.removeButtonClass();
  }

  /** The markup of the declared remove button, which the Tag renders after its text. */
  get removeButton(): Snippet | undefined {
    return this.#removeButton.current;
  }

  /**
   * Hands the markup of a declared remove button to the Tag, which renders it after the tag's
   * text. Returns the function that withdraws it.
   */
  readonly registerRemoveButton = this.#removeButton.register;

  get value(): string {
    return this.#props.value();
  }

  get id(): string {
    return this.#props.id();
  }

  /** The element that wraps the tag's text: it names the row and the remove button. */
  get labelId(): string {
    return `${this.id}-label`;
  }

  get removeButtonId(): string {
    return `${this.id}-remove`;
  }

  /** Makes this the roving tab stop of its group. A disabled tag never becomes one. */
  activate(): void {
    if (this.disabled) return;
    this.#groupCtx.setActiveId(this.id);
  }

  readonly registerInGroup = (id: string): void => {
    this.#groupCtx.register(id, this.registration);
  };

  readonly unregisterFromGroup = (id: string): void => {
    this.#groupCtx.unregister(id, this.registration);
  };

  /** Whether a range of tags can be selected from this one (an enabled tag, multiple mode). */
  get isRangeSelectable(): boolean {
    return this.#groupCtx.selectionMode === "multiple" && !this.disabled;
  }

  toggle(): void {
    if (!this.isInteractive) return;
    this.#groupCtx.toggleValue(this.#props.value());
  }

  /** Selects the range from the anchor to this tag. The group knows the order of its tags. */
  extendSelection(): void {
    if (!this.isRangeSelectable) return;
    this.#groupCtx.extendSelectionTo(this.id);
  }

  /**
   * Removes the tag and, if it held focus, moves focus to a neighbour. With the `"selection"`
   * scope, a selected tag removes every selected tag instead (`Delete` on the tag; its remove
   * button only removes itself). Outside a group the no-op context has no tags and no group
   * `onRemove`, so only the tag's own `onRemove` runs.
   */
  readonly remove = (scope: TagGroupRemoveScope = "self"): void => {
    if (!this.canRemove) return;
    this.#groupCtx.remove({ entry: this.registration, row: this.#props.getRef(), scope });
  };
}
