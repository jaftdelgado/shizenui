import type {
  TagGroupContext,
  TagGroupListRegistration,
  TagGroupRegistration,
  TagGroupRemoveRequest,
  TagGroupSelectRequest
} from "./tag-group.context.js";
import { LIST_SELECTOR, TAG_SELECTOR } from "./tag-group.constants.js";
import type { TagGroupSelectionMode, TagGroupSize, TagGroupVariant } from "./tag-group.types.js";
import { resolveSurfaceVariant, useSurfaceContext } from "../../../lib/contexts/index.js";
import type { SurfaceContextResult } from "../../../lib/contexts/index.js";
import {
  ContentSlotsState,
  createMounted,
  RovingFocusState,
  SelectionState
} from "../../../lib/runes/index.js";
import {
  emitSelectionValueChange,
  FocusRestoration,
  fromSelectionValues,
  toSelectionValues
} from "../../../lib/utils/index.js";
import type { SelectionValue, SelectionValueChange } from "../../../lib/utils/index.js";

export interface TagGroupStateProps {
  selectionMode: () => TagGroupSelectionMode;
  value: () => SelectionValue;
  setValue: (value: SelectionValue) => void;
  onValueChange: () => SelectionValueChange | undefined;
  onRemove: () => ((values: string[]) => void) | undefined;
  disabled: () => boolean | undefined;
  invalid: () => boolean | undefined;
  variant: () => TagGroupVariant | undefined;
  size: () => TagGroupSize | undefined;
  id: () => string;
  ariaLabel: () => string | undefined;
  ariaLabelledby: () => string | undefined;
  surfaceContext?: SurfaceContextResult;
  /**
   * Whether `element` sits inside a list of this group. It is the group's query to the DOM: the
   * TagGroup component injects it, so the state does not import it.
   */
  isInList: (element: Element) => boolean;
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

  // Plain, not reactive: the lists register while the group initializes, before the only readers
  // (`hasList` and `hasMultipleLists`, used by the development warnings, which run once the group
  // has mounted) look at them. Those warnings therefore no longer follow a list that appears or
  // goes away later, which is fine: they point at a misuse of the markup, not at a state to track.
  // Only one list per group is supported.
  readonly #lists = new Map<string, TagGroupListRegistration>();

  // The primitives read `#props` only when called, so they can be built in field initializers.
  // The fields that delegate to them must be declared after them.
  readonly #selection = new SelectionState({
    mode: () => this.#props.selectionMode(),
    values: () => toSelectionValues(this.#props.value()),
    setValues: (values) =>
      this.#props.setValue(fromSelectionValues(this.#props.selectionMode(), values)),
    onChange: (values) =>
      emitSelectionValueChange(this.#props.selectionMode(), this.#props.onValueChange(), values)
  });
  readonly field: ContentSlotsState;
  readonly #roving = new RovingFocusState<TagGroupRegistration>();
  // The one place where the state names the DOM: `FocusRestoration` (in `lib`) does the query, and
  // is configured with the selectors of the list and of its tags.
  readonly #focusRestoration = new FocusRestoration({
    containerSelector: LIST_SELECTOR,
    itemSelector: TAG_SELECTOR,
    isRegistered: (id) => this.#roving.isRegistered(id),
    setActiveId: (id) => this.#roving.setActiveId(id)
  });

  #variant = $derived.by(() =>
    resolveSurfaceVariant(this.#props.variant(), this.#surfaceCtx, undefined, "secondary")
  );

  readonly registerList = (id: string, list: TagGroupListRegistration): void => {
    this.#lists.set(id, list);
  };
  readonly unregisterList = (id: string): void => {
    this.#lists.delete(id);
    // The list is gone, and so is whatever it was waiting for.
    this.#focusRestoration.cancel();
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

  get variant(): TagGroupVariant | undefined {
    return this.#variant;
  }

  get size(): TagGroupSize | undefined {
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
    return this.#lists.size > 0;
  }

  /** Only one list per group is supported; used to warn in development. */
  get hasMultipleLists(): boolean {
    return this.#lists.size > 1;
  }

  get tabStopId(): string | undefined {
    return this.#roving.tabStopId;
  }

  readonly isSelected = this.#selection.isSelected;

  readonly toggleValue = this.#selection.toggle;

  readonly select = ({ id, value, extend }: TagGroupSelectRequest): void => {
    if (extend && this.selectionMode === "multiple") this.extendSelectionTo(id);
    else this.toggleValue(value);
  };

  readonly isInList = (element: Element): boolean => this.#props.isInList(element);

  // `SelectionState.extendTo` acts only in multiple mode, so the mode is not checked again here.
  // The only caller without ids is `select`, and it asks only in that mode.
  readonly extendSelectionTo = (targetId: string, orderedIds?: readonly string[]): void => {
    const valueOf = (id: string) => this.#roving.getItem(id)?.getValue();
    const target = valueOf(targetId);
    if (target === undefined) return;

    // Read only now, once the target is known: a caller that has no ids would otherwise ask the
    // list for nothing.
    const ordered = (orderedIds ?? this.#getOrderedIds()).flatMap((id) => valueOf(id) ?? []);
    this.#selection.extendTo(ordered, target);
  };

  /**
   * The ids of the enabled tags, in the order the user sees them. Only one list per group is
   * supported: the first one registered is the one read.
   */
  #getOrderedIds(): readonly string[] {
    const [list] = this.#lists.values();
    return list?.getOrderedIds() ?? [];
  }

  readonly remove = ({ entry, scope }: TagGroupRemoveRequest): void => {
    const removesSelection =
      scope === "selection" && this.selectionMode !== "none" && this.isSelected(entry.getValue());
    // Collected first: a consumer that flushes the DOM in its `onRemove` unregisters tags while
    // the removal runs.
    const entries = removesSelection
      ? this.#sortInVisualOrder(
          this.#roving
            .getItems()
            .filter((item) => item.canRemove() && this.isSelected(item.getValue()))
        )
      : [entry];

    this.#focusRestoration.run(entry.getElement(), () => this.#removeEntries(entries));
  };

  readonly register = this.#roving.register;

  readonly unregister = (id: string, entry: TagGroupRegistration): void => {
    this.#roving.unregister(id, entry);
    this.#focusRestoration.notifyUnregistered();
  };

  readonly isActive = this.#roving.isActive;

  readonly setActiveId = this.#roving.setActiveId;

  /**
   * `entries` in the order the user sees their tags, not the order they registered in: a tag
   * inserted later in the list registers last. A tag that is not in the list (it is outside its
   * `TagGroup.List`, which already warns) goes after the rest, in the order it registered.
   */
  #sortInVisualOrder(entries: TagGroupRegistration[]): TagGroupRegistration[] {
    const positions = new Map<string, number>();
    this.#getOrderedIds().forEach((id, index) => {
      const value = this.#roving.getItem(id)?.getValue();
      if (value !== undefined && !positions.has(value)) positions.set(value, index);
    });
    const positionOf = (item: TagGroupRegistration) =>
      positions.get(item.getValue()) ?? Number.MAX_SAFE_INTEGER;

    // The sort is stable: the tags that tie keep the order they registered in.
    return [...entries].sort((a, b) => positionOf(a) - positionOf(b));
  }

  /**
   * Each tag's own `onRemove` runs, in the order `entries` has (the order the user sees the tags
   * in), then the group's `onRemove` once with all their values in that same order.
   */
  #removeEntries(entries: readonly TagGroupRegistration[]): void {
    if (entries.length === 0) return;

    for (const entry of entries) entry.emitRemove();
    this.#props.onRemove()?.(entries.map((entry) => entry.getValue()));
  }
}
