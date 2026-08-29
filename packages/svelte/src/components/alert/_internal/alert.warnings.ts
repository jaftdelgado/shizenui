import { warnIf } from "../../../lib/runes/index.js";

export function setupAlertWarnings(options: { hasChildren: () => boolean }): void {
  warnIf(
    () => !options.hasChildren(),
    "Alert",
    "No children provided. Add content such as <Alert.Title> or <Alert.Description>."
  );
}
