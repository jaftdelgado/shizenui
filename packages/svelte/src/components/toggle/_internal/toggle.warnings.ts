import { warnIf } from "../../../lib/runes/index.js";

export function setupToggleWarnings(options: {
  isIconOnly: () => boolean;
  hasAccessibleName: () => boolean;
  isInGroup: () => boolean;
  hasValue: () => boolean;
  hasExplicitPressed: () => boolean;
}): void {
  warnIf(
    () => options.isIconOnly() && !options.hasAccessibleName(),
    "Toggle",
    "No accessible name found with 'iconOnly=true'. Pass 'aria-label' or 'aria-labelledby' so the toggle can be identified by assistive technologies."
  );

  warnIf(
    () => options.isInGroup() && !options.hasValue(),
    "Toggle",
    "Toggle inside a ToggleGroup requires a 'value' prop to participate in selection."
  );

  warnIf(
    () => options.isInGroup() && options.hasExplicitPressed(),
    "Toggle",
    "Toggle inside a ToggleGroup: 'pressed' prop is ignored. Use ToggleGroup's value instead."
  );
}
