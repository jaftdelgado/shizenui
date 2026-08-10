import { warnIf } from "../../../lib/runes/index.js";
import type { RadioContextResult } from "./radio.context.js";
import type { RadioStateInstance } from "./radio.state.svelte.js";
import type { RadioProps } from "./radio.types.js";

export function setupRadioWarnings(options: {
  state: RadioStateInstance;
  context: RadioContextResult;
  hasChildren: () => boolean;
  getVariant: () => RadioProps["variant"];
  hasAccessibleName: () => boolean;
}): void {
  warnIf(
    () => !options.hasChildren(),
    "Radio",
    "No children provided. Add at least <Radio.Control /> as a child."
  );

  warnIf(
    () => options.state.groupCtx.exists && options.getVariant() !== undefined,
    "Radio",
    "The local `variant` is ignored inside a RadioGroup. Set `variant` on RadioGroup instead."
  );

  warnIf(
    () => !options.context.hasLabel && !options.hasAccessibleName(),
    "Radio",
    "No accessible name found. Add a <Label> (typically inside <Radio.Content>), or pass aria-label/aria-labelledby directly."
  );
}
