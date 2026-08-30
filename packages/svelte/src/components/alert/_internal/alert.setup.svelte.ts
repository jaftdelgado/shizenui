import type { AlertContextValue } from "./alert.context.js";
import { setAlertContext } from "./alert.context.js";
import type { AlertStatus } from "./alert.types.js";
import { createIdRegistry } from "../../../lib/runes/index.js";

export function setupAlertContext(options: { status: () => AlertStatus }): void {
  const titleIds = createIdRegistry();
  const descriptionIds = createIdRegistry();

  setAlertContext({
    get status() {
      return options.status();
    },
    get titleIds() {
      return titleIds.ids;
    },
    get descriptionIds() {
      return descriptionIds.ids;
    },
    registerTitle: titleIds.register,
    unregisterTitle: titleIds.unregister,
    registerDescription: descriptionIds.register,
    unregisterDescription: descriptionIds.unregister
  } satisfies AlertContextValue);
}
