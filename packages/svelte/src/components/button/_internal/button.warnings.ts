import { warnIf } from "../../../lib/runes/index.js";

export function setupButtonWarnings(options: {
  isIconOnly: () => boolean;
  hasAccessibleName: () => boolean;
}): void {
  warnIf(
    () => options.isIconOnly() && !options.hasAccessibleName(),
    "Button",
    "No accessible name found with 'iconOnly=true'. Pass 'aria-label' or 'aria-labelledby' so the button can be identified by assistive technologies."
  );
}
