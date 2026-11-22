// Pure arithmetic of keyboard navigation in a roving container: no DOM involved.

export type RovingFocusOrientation = "horizontal" | "vertical";

export interface RovingFocusIndexOptions extends RovingFocusKeyOptions {
  key: string;
  currentIndex: number;
  itemCount: number;
  wrapAround?: boolean;
}

export interface RovingFocusKeyOptions {
  orientation: RovingFocusOrientation;
  allowCrossAxis?: boolean;
  /** `Home` and `End` move to the first and the last item. */
  includeHomeEnd?: boolean;
  /** `PageUp` and `PageDown` move to the first and the last item. */
  includePageUpDown?: boolean;
}

/** The index `Home`/`End` (and `PageUp`/`PageDown`, when included) move to, if `key` is one. */
function resolveEdgeIndex(
  key: string,
  itemCount: number,
  options: Pick<RovingFocusKeyOptions, "includeHomeEnd" | "includePageUpDown">
): number | undefined {
  const { includeHomeEnd = false, includePageUpDown = false } = options;
  if ((includeHomeEnd && key === "Home") || (includePageUpDown && key === "PageUp")) return 0;
  if ((includeHomeEnd && key === "End") || (includePageUpDown && key === "PageDown")) {
    return itemCount - 1;
  }
  return undefined;
}

const HORIZONTAL_KEY_OFFSETS = {
  ArrowRight: 1,
  ArrowLeft: -1
} as const;

const VERTICAL_KEY_OFFSETS = {
  ArrowDown: 1,
  ArrowUp: -1
} as const;

const CROSS_AXIS_KEY_OFFSETS = {
  ...HORIZONTAL_KEY_OFFSETS,
  ...VERTICAL_KEY_OFFSETS
} as const;

function getKeyOffsetMap(
  orientation: RovingFocusOrientation,
  allowCrossAxis: boolean
): Record<string, number> {
  if (allowCrossAxis) return CROSS_AXIS_KEY_OFFSETS;
  return orientation === "horizontal" ? HORIZONTAL_KEY_OFFSETS : VERTICAL_KEY_OFFSETS;
}

export function isRovingFocusKey(key: string, options: RovingFocusKeyOptions): boolean {
  const { orientation, allowCrossAxis = false } = options;

  if (resolveEdgeIndex(key, 1, options) !== undefined) return true;

  return Object.hasOwn(getKeyOffsetMap(orientation, allowCrossAxis), key);
}

export function resolveRovingFocusIndex(options: RovingFocusIndexOptions): number | undefined {
  const {
    key,
    currentIndex,
    itemCount,
    orientation,
    allowCrossAxis = false,
    wrapAround = false
  } = options;

  const isCurrentIndexValid = currentIndex >= 0 && currentIndex < itemCount;
  if (itemCount === 0 || !isCurrentIndexValid) {
    return undefined;
  }

  const edgeIndex = resolveEdgeIndex(key, itemCount, options);
  if (edgeIndex !== undefined) return edgeIndex;

  const offsetMap = getKeyOffsetMap(orientation, allowCrossAxis);
  // Own keys only (`toString` is not a key), and `noUncheckedIndexedAccess` makes the lookup
  // possibly `undefined` anyway.
  const offset = Object.hasOwn(offsetMap, key) ? offsetMap[key] : undefined;
  if (offset === undefined) return undefined;

  const nextIndex = currentIndex + offset;

  if (wrapAround) {
    return (nextIndex + itemCount) % itemCount;
  }

  return nextIndex >= 0 && nextIndex < itemCount ? nextIndex : undefined;
}
