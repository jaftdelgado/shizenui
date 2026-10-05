import { useTagGroupContext } from "../../tag-group/_internal/tag-group.context.js";
import type { TagGroupContextResult } from "../../tag-group/_internal/tag-group.context.js";
import type { TagSize, TagVariant } from "./tag.types.js";

export class TagState {
  #value: () => string;
  #disabled: () => boolean | undefined;
  #id: () => string;
  #textValue: () => string | undefined;
  #onRemove: () => (() => void) | undefined;

  readonly groupCtx: TagGroupContextResult;

  get finalDisabled(): boolean {
    const local = this.#disabled();
    if (local !== undefined) return local;
    return this.groupCtx.exists ? this.groupCtx.disabled : false;
  }

  get finalVariant(): TagVariant {
    return this.groupCtx.variant;
  }

  get finalSize(): TagSize {
    return this.groupCtx.size;
  }

  get isSelectable(): boolean {
    return this.groupCtx.exists && this.groupCtx.selectionMode !== "none";
  }

  get isInteractive(): boolean {
    return this.isSelectable && !this.finalDisabled;
  }

  get isSelected(): boolean {
    return this.isSelectable && this.groupCtx.isSelected(this.#value());
  }

  get isRemovable(): boolean {
    return Boolean(this.#onRemove()) || this.groupCtx.isRemovable;
  }

  get canRemove(): boolean {
    return this.isRemovable && !this.finalDisabled;
  }

  get value(): string {
    return this.#value();
  }

  get id(): string {
    return this.#id();
  }

  get textValue(): string | undefined {
    return this.#textValue();
  }

  constructor(props: {
    value: () => string;
    disabled: () => boolean | undefined;
    id: () => string;
    textValue: () => string | undefined;
    onRemove: () => (() => void) | undefined;
    groupContext?: TagGroupContextResult;
  }) {
    this.#value = props.value;
    this.#disabled = props.disabled;
    this.#id = props.id;
    this.#textValue = props.textValue;
    this.#onRemove = props.onRemove;

    this.groupCtx = props.groupContext ?? useTagGroupContext();
  }

  toggle(): void {
    if (!this.isInteractive) return;
    this.groupCtx.toggleValue(this.#value());
  }

  remove(): void {
    if (!this.canRemove) return;
    this.#onRemove()?.();
    this.groupCtx.remove(this.#value());
  }
}

export type TagStateInstance = InstanceType<typeof TagState>;
