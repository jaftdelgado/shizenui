import type {
  TagGroupContext,
  TagGroupRegistration,
  TagGroupRemoveRequest
} from "./tag-group.context.js";
import { LIST_SELECTOR, TAG_SELECTOR } from "./tag-group.constants.js";
import type { TagGroupSelectionMode } from "./tag-group.types.js";
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
import { getListRows, isInsideOwnList } from "./tag-group.queries.js";
import type { TagSize, TagVariant } from "../../tag/_internal/index.js";

export interface TagGroupStateProps {
  selectionMode: () => TagGroupSelectionMode;
  value: () => SelectionValue;
  setValue: (value: SelectionValue) => void;
  onValueChange: () => SelectionValueChange | undefined;
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

  // Plain, not reactive: the lists register while the group initializes, before the only readers
  // (`hasList` and `hasMultipleLists`, used by the development warnings, which run once the group
  // has mounted) look at them. Those warnings therefore no longer follow a list that appears or
  // goes away later, which is fine: they point at a misuse of the markup, not at a state to track.
  // Only one list per group is supported.
  readonly #lists = new Map<string, () => HTMLElement | null>();

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
  readonly #focusRestoration = new FocusRestoration({
    containerSelector: LIST_SELECTOR,
    itemSelector: TAG_SELECTOR,
    isRegistered: (id) => this.#roving.isRegistered(id),
    setActiveId: (id) => this.#roving.setActiveId(id)
  });

  #variant = $derived.by(() =>
    resolveSurfaceVariant(this.#props.variant(), this.#surfaceCtx, undefined, "secondary")
  );

  readonly registerList = (id: string, getElement: () => HTMLElement | null): void => {
    this.#lists.set(id, getElement);
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

  readonly isInList = (element: Element): boolean => isInsideOwnList(element);

  readonly extendSelectionTo = (targetId: string, rows?: readonly HTMLElement[]): void => {
    if (this.selectionMode !== "multiple") return;

    const valueOf = (id: string) => this.#roving.getItem(id)?.getValue();
    const target = valueOf(targetId);
    if (target === undefined) return;

    // Read only now, once the mode and the target allow a range: a caller that has no rows
    // would otherwise query the DOM for nothing.
    const ordered = (rows ?? this.#getRows()).flatMap((row) => valueOf(row.id) ?? []);
    this.#selection.extendTo(ordered, target);
  };

  /**
   * The enabled rows of the group's list, in DOM order. Only one list per group is supported: the
   * first one that is rendered is the one read.
   */
  #getRows(): HTMLElement[] {
    for (const getElement of this.#lists.values()) {
      const list = getElement();
      if (list) return getListRows(list);
    }
    return [];
  }

  readonly remove = ({ entry, row, scope }: TagGroupRemoveRequest): void => {
    const removesSelection =
      scope === "selection" && this.selectionMode !== "none" && this.isSelected(entry.getValue());
    // Collected first: a consumer that flushes the DOM in its `onRemove` unregisters tags while
    // the removal runs.
    const entries = removesSelection
      ? this.#roving
          .getItems()
          .filter((item) => item.canRemove() && this.isSelected(item.getValue()))
      : [entry];

    this.#focusRestoration.run(row, () => this.#removeEntries(entries));
  };

  readonly register = this.#roving.register;

  readonly unregister = (id: string, entry: TagGroupRegistration): void => {
    this.#roving.unregister(id, entry);
    this.#focusRestoration.notifyUnregistered();
  };

  readonly isActive = this.#roving.isActive;

  readonly setActiveId = this.#roving.setActiveId;

  /** Each tag's own `onRemove` runs, then the group's `onRemove` once with all their values. */
  #removeEntries(entries: readonly TagGroupRegistration[]): void {
    if (entries.length === 0) return;

    for (const entry of entries) entry.emitRemove();
    this.#props.onRemove()?.(entries.map((entry) => entry.getValue()));
  }
}
