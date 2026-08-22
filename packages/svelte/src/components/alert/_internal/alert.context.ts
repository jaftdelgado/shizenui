import { createContext } from "svelte";

export interface AlertContextValue {
  readonly id: string | undefined;
  readonly color: string;
  readonly registerTitle: (id: string) => void;
  readonly unregisterTitle: (id: string) => void;
  readonly registerDescription: (id: string) => void;
  readonly unregisterDescription: (id: string) => void;
  readonly titleIds: string;
  readonly descriptionIds: string;
}

export interface AlertContextResult {
  readonly exists: boolean;
  readonly id: string | undefined;
  readonly color: string;
  readonly titleIds: string;
  readonly descriptionIds: string;
  readonly registerTitle: (id: string) => void;
  readonly unregisterTitle: (id: string) => void;
  readonly registerDescription: (id: string) => void;
  readonly unregisterDescription: (id: string) => void;
}

const [getAlertContext, setAlertContext] = createContext<AlertContextValue>();

function tryGetAlertContext(): AlertContextValue | undefined {
  try {
    return getAlertContext();
  } catch {
    return undefined;
  }
}

export { setAlertContext };

export function useAlertContext(): AlertContextResult {
  const context = tryGetAlertContext();

  if (!context) {
    return {
      get exists() {
        return false;
      },
      get id() {
        return undefined;
      },
      get color() {
        return "default";
      },
      get titleIds() {
        return "";
      },
      get descriptionIds() {
        return "";
      },
      registerTitle(_id: string) {},
      unregisterTitle(_id: string) {},
      registerDescription(_id: string) {},
      unregisterDescription(_id: string) {}
    } satisfies AlertContextResult;
  }

  return {
    get exists() {
      return true;
    },
    get id() {
      return context.id;
    },
    get color() {
      return context.color;
    },
    get titleIds() {
      return context.titleIds;
    },
    get descriptionIds() {
      return context.descriptionIds;
    },
    registerTitle(id: string) {
      context.registerTitle(id);
    },
    unregisterTitle(id: string) {
      context.unregisterTitle(id);
    },
    registerDescription(id: string) {
      context.registerDescription(id);
    },
    unregisterDescription(id: string) {
      context.unregisterDescription(id);
    }
  } satisfies AlertContextResult;
}
