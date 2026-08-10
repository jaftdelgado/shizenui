import { warnIf } from "../../../lib/runes/index.js";
import type { CheckboxContextResult } from "./checkbox.context.js";
import type { CheckboxStateInstance } from "./checkbox.state.svelte.js";
import type { CheckboxProps } from "./checkbox.types.js";

export function setupCheckboxWarnings(options: {
  state: CheckboxStateInstance;
  context: CheckboxContextResult;
  hasChildren: () => boolean;
  getValue: () => string | undefined;
  getVariant: () => CheckboxProps["variant"];
  hasAccessibleName: () => boolean;
}): void {
  warnIf(
    () => !options.hasChildren(),
    "Checkbox",
    "No children provided. Add at least <Checkbox.Control /> as a child."
  );

  warnIf(
    () => options.state.groupCtx.exists && options.getValue() === undefined,
    "Checkbox",
    "A Checkbox inside Checkbox.Group requires the `value` prop."
  );

  warnIf(
    () => options.state.groupCtx.exists && options.getVariant() !== undefined,
    "Checkbox",
    "The local `variant` is ignored inside a CheckboxGroup. Set `variant` on CheckboxGroup instead."
  );

  warnIf(
    () => !options.context.hasLabel && !options.hasAccessibleName(),
    "Checkbox",
    "No accessible name found. Add a <Label> (typically inside <Checkbox.Content>), or pass aria-label/aria-labelledby directly."
  );
}
