import { createContext } from "svelte";

export interface ContentSlotContextValue {
  readonly registerLabel: (id: string) => void;
  readonly unregisterLabel: (id: string) => void;
  readonly registerDescription: (id: string) => void;
  readonly unregisterDescription: (id: string) => void;
  readonly registerError: (id: string) => void;
  readonly unregisterError: (id: string) => void;
}

export interface ContentSlotContextResult {
  readonly exists: boolean;
  readonly registerLabel: (id: string) => void;
  readonly unregisterLabel: (id: string) => void;
  readonly registerDescription: (id: string) => void;
  readonly unregisterDescription: (id: string) => void;
  readonly registerError: (id: string) => void;
  readonly unregisterError: (id: string) => void;
}

const [getContentSlotContext, setContentSlotContext] = createContext<ContentSlotContextValue>();

function tryGetContentSlotContext(): ContentSlotContextValue | undefined {
  try {
    return getContentSlotContext();
  } catch {
    return undefined;
  }
}

export { setContentSlotContext };

export function useContentSlotContext(): ContentSlotContextResult {
  const context = tryGetContentSlotContext();

  if (!context) {
    return {
      get exists() {
        return false;
      },
      registerLabel(_id: string) {},
      unregisterLabel(_id: string) {},
      registerDescription(_id: string) {},
      unregisterDescription(_id: string) {},
      registerError(_id: string) {},
      unregisterError(_id: string) {}
    } satisfies ContentSlotContextResult;
  }

  return {
    get exists() {
      return true;
    },
    registerLabel(id: string) {
      return context.registerLabel(id);
    },
    unregisterLabel(id: string) {
      return context.unregisterLabel(id);
    },
    registerDescription(id: string) {
      return context.registerDescription(id);
    },
    unregisterDescription(id: string) {
      return context.unregisterDescription(id);
    },
    registerError(id: string) {
      return context.registerError(id);
    },
    unregisterError(id: string) {
      return context.unregisterError(id);
    }
  } satisfies ContentSlotContextResult;
}
