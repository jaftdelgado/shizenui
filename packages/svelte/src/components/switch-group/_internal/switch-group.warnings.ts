import { warnIf } from "../../../lib/runes/index.js";
import type { SwitchGroupContextResult } from "./switch-group.context.js";

export function setupSwitchGroupWarnings(options: {
  context: SwitchGroupContextResult;
  hasChildren: () => boolean;
  hasAccessibleName: () => boolean;
}): void {
  warnIf(
    () => !options.hasChildren(),
    "SwitchGroup",
    "No children provided. Add at least one <Switch> as a child."
  );

  warnIf(
    () => !options.context.hasLabel && !options.hasAccessibleName(),
    "SwitchGroup",
    "No accessible name found. Add a <Label> as a child, or pass aria-label/aria-labelledby directly."
  );
}
