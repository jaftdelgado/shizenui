import { warnIf } from "../../../lib/runes/index.js";
import type { RadioGroupContextResult } from "./radio-group.context.js";

export function setupRadioGroupWarnings(options: {
  context: RadioGroupContextResult;
  hasChildren: () => boolean;
  hasAccessibleName: () => boolean;
}): void {
  warnIf(
    () => !options.hasChildren(),
    "RadioGroup",
    "No children provided. Add at least one <Radio> as a child."
  );

  warnIf(
    () => !options.context.hasLabel && !options.hasAccessibleName(),
    "RadioGroup",
    "No Label found. Add a <Label> as a child, or pass aria-label/aria-labelledby directly."
  );

  warnIf(
    () => !options.context.hasItems,
    "RadioGroup",
    "No <RadioGroup.Items> found. Wrap your <Radio> children in <RadioGroup.Items> to enable roving focus and keyboard navigation."
  );
}
