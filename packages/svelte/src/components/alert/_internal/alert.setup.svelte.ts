import type { AlertContextValue } from "./alert.context.js";
import { setAlertContext } from "./alert.context.js";

export function setupAlertContext(options: {
  id: () => string | undefined;
  status: () => string;
}): void {
  let titleIds = $state(new Set<string>());
  let descriptionIds = $state(new Set<string>());

  const joinIds = (ids: Set<string>): string => [...ids].join(" ");

  setAlertContext({
    get id() {
      return options.id();
    },
    get status() {
      return options.status();
    },
    get titleIds() {
      return joinIds(titleIds);
    },
    get descriptionIds() {
      return joinIds(descriptionIds);
    },
    registerTitle(id: string) {
      if (titleIds.has(id)) return;
      const next = new Set(titleIds);
      next.add(id);
      titleIds = next;
    },
    unregisterTitle(id: string) {
      if (!titleIds.has(id)) return;
      const next = new Set(titleIds);
      next.delete(id);
      titleIds = next;
    },
    registerDescription(id: string) {
      if (descriptionIds.has(id)) return;
      const next = new Set(descriptionIds);
      next.add(id);
      descriptionIds = next;
    },
    unregisterDescription(id: string) {
      if (!descriptionIds.has(id)) return;
      const next = new Set(descriptionIds);
      next.delete(id);
      descriptionIds = next;
    }
  } satisfies AlertContextValue);
}
