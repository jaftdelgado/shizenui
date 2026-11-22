import { useTagGroupContext } from "../../tag-group/_internal/index.js";
import type {
  TagGroupContext,
  TagGroupRegistration,
  TagGroupRemoveScope
} from "../../tag-group/_internal/index.js";
import type { TagSize, TagVariant } from "./tag.types.js";

export interface TagStateProps {
  value: () => string;
  disabled: () => boolean | undefined;
  id: () => string;
  onRemove: () => (() => void) | undefined;
  /** The tag's element, if it is rendered. */
  getRef: () => HTMLElement | null;
  groupContext?: TagGroupContext;
}

export class TagState {
  readonly #props: TagStateProps;

  readonly #groupCtx: TagGroupContext;

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

  registerInGroup(id: string): void {
    this.#groupCtx.register(id, this.registration);
  }

  unregisterFromGroup(id: string): void {
    this.#groupCtx.unregister(id, this.registration);
  }

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
  remove(scope: TagGroupRemoveScope = "self"): void {
    if (!this.canRemove) return;
    this.#groupCtx.remove({ entry: this.registration, row: this.#props.getRef(), scope });
  }
}
