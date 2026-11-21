import {
  getListTagIds,
  useTagGroupContext,
  useTagGroupListContext
} from "../../tag-group/_internal/index.js";
import type {
  TagGroupContext,
  TagGroupListContext,
  TagGroupRegistration
} from "../../tag-group/_internal/index.js";
import type { TagSize, TagVariant } from "./tag.types.js";

export interface TagStateProps {
  value: () => string;
  disabled: () => boolean | undefined;
  id: () => string;
  onRemove: () => (() => void) | undefined;
  groupContext?: TagGroupContext;
  listContext?: TagGroupListContext;
}

export class TagState {
  readonly #props: TagStateProps;

  readonly #groupCtx: TagGroupContext;
  readonly #listCtx: TagGroupListContext;

  #isActive = $derived.by(() => this.#groupCtx.isActive(this.#props.id()));
  #isSelected = $derived.by(
    () => this.isSelectable && this.#groupCtx.isSelected(this.#props.value())
  );

  constructor(props: TagStateProps) {
    this.#props = props;
    this.#groupCtx = props.groupContext ?? useTagGroupContext();
    this.#listCtx = props.listContext ?? useTagGroupListContext();
  }

  /** Whether the tag sits inside a <TagGroup>. Fixed for the life of the tag. */
  get inGroup(): boolean {
    return this.#groupCtx.exists;
  }

  /** Whether the tag sits inside the <TagGroup.List> of its group. Fixed for the life of the tag. */
  get inList(): boolean {
    return this.#listCtx.exists;
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

  registerInGroup(id: string, entry: TagGroupRegistration): void {
    this.#groupCtx.register(id, entry);
  }

  unregisterFromGroup(id: string, entry: TagGroupRegistration): void {
    this.#groupCtx.unregister(id, entry);
  }

  /** Whether a range of tags can be selected from this one (an enabled tag, multiple mode). */
  get isRangeSelectable(): boolean {
    return this.#groupCtx.selectionMode === "multiple" && !this.disabled;
  }

  /**
   * Removes the tag and, if it held focus, moves focus to a neighbour. With `withSelection`, a
   * selected tag removes every selected tag instead (`Delete` on the tag; its remove button only
   * removes itself). Outside a group the no-op context has no tags and no list, so only `remove`
   * has an effect.
   */
  requestRemoval(row: HTMLElement | null, options: { withSelection?: boolean } = {}): void {
    const removesSelection = options.withSelection === true && this.isSelected;
    this.#groupCtx.requestRemoval({
      id: this.id,
      row,
      remove: () => (removesSelection ? this.#groupCtx.removeSelected() : this.remove())
    });
  }

  toggle(): void {
    if (!this.isInteractive) return;
    this.#groupCtx.toggleValue(this.#props.value());
  }

  /** Selects the range from the anchor to this tag, among the enabled tags of `row`'s list. */
  extendSelection(row: HTMLElement): void {
    if (!this.isRangeSelectable) return;
    this.#groupCtx.extendSelectionTo(this.id, getListTagIds(row));
  }

  remove(): void {
    if (!this.canRemove) return;
    this.runOwnOnRemove();
    this.#groupCtx.remove(this.#props.value());
  }

  /** Runs the tag's own `onRemove`, without the group's. */
  runOwnOnRemove(): void {
    this.#props.onRemove()?.();
  }
}
