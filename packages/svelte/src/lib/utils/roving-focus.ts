export type RovingFocusOrientation = "horizontal" | "vertical";

export interface RovingFocusIndexOptions {
  key: string;
  currentIndex: number;
  itemCount: number;
  orientation: RovingFocusOrientation;
  allowCrossAxis?: boolean;
  includeHomeEnd?: boolean;
  wrapAround?: boolean;
}

export interface RovingFocusKeyOptions {
  orientation: RovingFocusOrientation;
  allowCrossAxis?: boolean;
  includeHomeEnd?: boolean;
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

export function getRovingCandidates<T extends HTMLElement>(
  container: HTMLElement,
  selector: string
): T[] {
  return Array.from(container.querySelectorAll<T>(selector));
}

export function isRovingFocusKey(key: string, options: RovingFocusKeyOptions): boolean {
  const { orientation, allowCrossAxis = false, includeHomeEnd = false } = options;

  if (includeHomeEnd && (key === "Home" || key === "End")) {
    return true;
  }

  return Object.hasOwn(getKeyOffsetMap(orientation, allowCrossAxis), key);
}

export function resolveRovingFocusIndex(options: RovingFocusIndexOptions): number | undefined {
  const {
    key,
    currentIndex,
    itemCount,
    orientation,
    allowCrossAxis = false,
    includeHomeEnd = false,
    wrapAround = false
  } = options;

  const isCurrentIndexValid = currentIndex >= 0 && currentIndex < itemCount;
  if (itemCount === 0 || !isCurrentIndexValid) {
    return undefined;
  }

  if (includeHomeEnd) {
    if (key === "Home") return 0;
    if (key === "End") return itemCount - 1;
  }

  const offsetMap = getKeyOffsetMap(orientation, allowCrossAxis);
  if (!Object.hasOwn(offsetMap, key)) {
    return undefined;
  }

  const offset = offsetMap[key];
  if (offset === undefined) {
    return undefined;
  }

  const nextIndex = currentIndex + offset;

  if (wrapAround) {
    return (nextIndex + itemCount) % itemCount;
  }

  return nextIndex >= 0 && nextIndex < itemCount ? nextIndex : undefined;
}
