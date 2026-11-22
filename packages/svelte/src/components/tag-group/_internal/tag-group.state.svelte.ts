import type { TagGroupContext, TagGroupRegistration } from "./tag-group.context.js";
import { TagRemoval } from "./tag-group.removal.js";
import type { TagGroupSelectionMode } from "./tag-group.types.js";
import { resolveSurfaceVariant, useSurfaceContext } from "../../../lib/index.js";
import type { SurfaceContextResult } from "../../../lib/index.js";
import {
  ContentSlotsState,
  createIdRegistry,
  createMounted,
  RovingFocusState,
  SelectionState
} from "../../../lib/runes/index.js";
import type { TagSize, TagVariant } from "../../tag/_internal/index.js";

export interface TagGroupStateProps {
  selectionMode: () => TagGroupSelectionMode;
  value: () => string | string[] | undefined;
  setValue: (value: string | string[] | undefined) => void;
  onValueChange: () =>
    ((value: string | undefined) => void) | ((value: string[]) => void) | undefined;
  onRemove: () => ((values: string[]) => void) | undefined;
  disabled: () => boolean | undefined;
  invalid: () => boolean | undefined;
  variant: () => TagVariant | undefined;
  size: () => TagSize | undefined;
  id: () => string;
  ariaLabel: () => string | undefined;
  ariaLabelledby: () => string | undefined;
  surfaceContext?: SurfaceContextResult;
  /** Whether the group has mounted. Defaults to `createMounted()`. */
  mounted?: () => boolean;
}

/**
 * State of a TagGroup. It is also the group's context: it is passed as is to
 * `setTagGroupContext`. Its `field` is the ContentSlot context, which receives the registrations
 * of the group's Label, Description and FieldError.
 */
export class TagGroupState implements TagGroupContext {
  readonly exists = true;

  readonly #props: TagGroupStateProps;
  readonly #surfaceCtx: SurfaceContextResult;

  readonly #listIds = createIdRegistry();

  // The primitives read `#props` only when called, so they can be built in field initializers.
  // The fields that delegate to them must be declared after them.
  readonly #selection = new SelectionState({
    mode: () => this.#props.selectionMode(),
    values: () => toValues(this.#props.value()),
    setValues: (values) =>
      this.#props.setValue(this.#props.selectionMode() === "single" ? values[0] : values),
    onChange: (values) => this.#emitValueChange(values)
  });
  readonly field: ContentSlotsState;
  readonly #roving = new RovingFocusState<TagGroupRegistration>();
  readonly #removal = new TagRemoval({
    isRegistered: (id) => this.#roving.isRegistered(id),
    setActiveId: (id) => this.#roving.setActiveId(id)
  });

  #variant = $derived.by(() =>
    resolveSurfaceVariant(this.#props.variant(), this.#surfaceCtx, undefined, "secondary")
  );

  readonly registerList = this.#listIds.register;
  readonly unregisterList = (id: string): void => {
    this.#listIds.unregister(id);
    // The list is gone, and so is whatever it was waiting for.
    this.#removal.cancel();
  };

  constructor(props: TagGroupStateProps) {
    this.#props = props;
    this.#surfaceCtx = props.surfaceContext ?? useSurfaceContext();

    // Built here, not in a field initializer: the default signal has to be created once, while
    // the component initializes.
    let mounted = props.mounted;
    if (!mounted) {
      const signal = createMounted();
      mounted = () => signal.current;
    }
    this.field = new ContentSlotsState({
      id: () => props.id(),
      invalid: () => this.invalid,
      mounted
    });
  }

  get selectionMode(): TagGroupSelectionMode {
    return this.#props.selectionMode();
  }

  get disabled(): boolean {
    return this.#props.disabled() ?? false;
  }

  get invalid(): boolean {
    return this.#props.invalid() ?? false;
  }

  get isRemovable(): boolean {
    return Boolean(this.#props.onRemove());
  }

  get variant(): TagVariant | undefined {
    return this.#variant;
  }

  get size(): TagSize | undefined {
    return this.#props.size();
  }

  get id(): string {
    return this.#props.id();
  }

  get ariaLabel(): string | undefined {
    return this.#props.ariaLabel();
  }

  get ariaLabelledby(): string | undefined {
    return this.#props.ariaLabelledby();
  }

  get hasList(): boolean {
    return this.#listIds.size > 0;
  }

  /** Only one list per group is supported; used to warn in development. */
  get hasMultipleLists(): boolean {
    return this.#listIds.size > 1;
  }

  get tabStopId(): string | undefined {
    return this.#roving.tabStopId;
  }

  readonly isSelected = this.#selection.isSelected;

  readonly toggleValue = this.#selection.toggle;

  readonly extendSelectionTo = (targetId: string, orderedIds: readonly string[]): void => {
    if (this.selectionMode !== "multiple") return;

    const valueOf = (id: string) => this.#roving.getItem(id)?.getValue();
    const target = valueOf(targetId);
    if (target === undefined) return;

    this.#selection.extendTo(
      orderedIds.flatMap((id) => valueOf(id) ?? []),
      target
    );
  };

  readonly remove = (value: string): void => {
    this.#props.onRemove()?.([value]);
  };

  readonly removeSelected = (): void => {
    // Collected first: a consumer that flushes the DOM in its `onRemove` unregisters tags while
    // this runs.
    const entries = this.#roving
      .getItems()
      .filter((entry) => entry.canRemove() && this.isSelected(entry.getValue()));
    if (entries.length === 0) return;

    for (const entry of entries) entry.runOwnOnRemove();
    this.#props.onRemove()?.(entries.map((entry) => entry.getValue()));
  };

  readonly register = this.#roving.register;

  readonly unregister = (id: string, entry: TagGroupRegistration): void => {
    this.#roving.unregister(id, entry);
    this.#removal.notifyUnregistered();
  };

  readonly requestRemoval = this.#removal.request;

  readonly isActive = this.#roving.isActive;

  readonly setActiveId = this.#roving.setActiveId;

  /**
   * The boundary between the array the selection works with and the public `onValueChange`, whose
   * argument is a string in single mode and an array in multiple mode. `selectionMode` decides
   * the shape at runtime, which the types of the props cannot express: the only casts live here.
   */
  #emitValueChange(values: string[]): void {
    const onValueChange = this.#props.onValueChange();
    if (!onValueChange) return;

    if (this.#props.selectionMode() === "single") {
      (onValueChange as (value: string | undefined) => void)(values[0]);
    } else {
      (onValueChange as (value: string[]) => void)(values);
    }
  }
}

/** The selected values as an array, whatever the shape of the public value. */
function toValues(value: string | string[] | undefined): string[] {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}
