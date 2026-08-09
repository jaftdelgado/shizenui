import type { RadioGroupContextResult } from "./radio-group.context.js";
import {
  getRovingCandidates,
  isRovingFocusKey,
  resolveRovingFocusIndex
} from "../../../lib/utils/index.js";

export function createRadioGroupItemsHandlers(options: {
  getContainer: () => HTMLDivElement | null;
  groupCtx: RadioGroupContextResult;
}) {
  const { getContainer, groupCtx } = options;

  function handleFocusIn(e: FocusEvent): void {
    if (groupCtx.hasSelection) return;

    const container = getContainer();
    if (!container) return;

    const relatedTarget = e.relatedTarget as HTMLElement | null;
    if (relatedTarget && container.contains(relatedTarget)) return;

    const isShiftTab =
      relatedTarget !== null &&
      Boolean(container.compareDocumentPosition(relatedTarget) & Node.DOCUMENT_POSITION_FOLLOWING);

    const candidates = getRovingCandidates<HTMLButtonElement>(
      container,
      '[role="radio"]:not([data-disabled])'
    );
    if (candidates.length === 0) return;

    const target = isShiftTab ? candidates[candidates.length - 1] : candidates[0];
    if (!target) return;

    target.focus();
    groupCtx.setActiveId(target.id);
  }

  function handleKeydown(e: KeyboardEvent): void {
    const orientation = groupCtx.orientation;
    const navigationOptions = {
      orientation,
      allowCrossAxis: true,
      includeHomeEnd: true
    } as const;

    if (!isRovingFocusKey(e.key, navigationOptions)) return;

    const container = getContainer();
    if (!container) return;

    const candidates = getRovingCandidates<HTMLButtonElement>(
      container,
      '[role="radio"]:not([data-disabled])'
    );
    if (candidates.length === 0) return;

    const target = e.target as HTMLButtonElement;
    const currentIndex = candidates.indexOf(target);
    if (currentIndex === -1) return;

    e.preventDefault();

    const targetIndex = resolveRovingFocusIndex({
      key: e.key,
      currentIndex,
      itemCount: candidates.length,
      ...navigationOptions,
      wrapAround: true
    });
    if (targetIndex === undefined) return;

    const nextCandidate = candidates[targetIndex];
    if (!nextCandidate) return;

    nextCandidate.focus();
    groupCtx.setActiveId(nextCandidate.id);

    if (groupCtx.readonly) return;

    const value = groupCtx.getValueForId(nextCandidate.id);
    if (value !== undefined) {
      groupCtx.setValue(value);
    }
  }

  return { handleFocusIn, handleKeydown };
}

export type RadioGroupItemsHandlers = ReturnType<typeof createRadioGroupItemsHandlers>;
