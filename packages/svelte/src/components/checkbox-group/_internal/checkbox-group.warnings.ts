import { warnIf } from "../../../lib/runes/index.js";
import type { CheckboxGroupContextResult } from "./checkbox-group.context.js";

export function setupCheckboxGroupWarnings(options: {
  context: CheckboxGroupContextResult;
  hasChildren: () => boolean;
  hasAccessibleName: () => boolean;
}): void {
  warnIf(
    () => !options.hasChildren(),
    "CheckboxGroup",
    "No children provided. Add at least one <Checkbox> as a child."
  );

  warnIf(
    () => !options.context.hasLabel && !options.hasAccessibleName(),
    "CheckboxGroup",
    "No Label found. Add a <Label> as a child, or pass aria-label/aria-labelledby directly."
  );
}
