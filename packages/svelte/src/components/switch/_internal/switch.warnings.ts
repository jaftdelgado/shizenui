import { warnIf } from "../../../lib/runes/index.js";
import type { SwitchContextResult } from "./switch.context.js";
import type { SwitchStateInstance } from "./switch.state.svelte.js";

export function setupSwitchWarnings(options: {
  state: SwitchStateInstance;
  context: SwitchContextResult;
  hasChildren: () => boolean;
  hasAccessibleName: () => boolean;
  getValue: () => string | undefined;
}): void {
  warnIf(
    () => !options.hasChildren(),
    "Switch",
    "No children provided. Add at least <Switch.Control /> as a child."
  );

  warnIf(
    () => options.state.groupCtx.exists && options.getValue() === undefined,
    "Switch",
    "A Switch inside SwitchGroup requires the `value` prop."
  );

  warnIf(
    () => !options.context.hasLabel && !options.hasAccessibleName(),
    "Switch",
    "No accessible name found. Add a <Label> (typically inside <Switch.Content>), or pass aria-label/aria-labelledby directly."
  );
}
