import { createContext } from "svelte";

export interface ContentSlotContextValue {
  readonly registerDescription: (id: string) => void;
  readonly unregisterDescription: (id: string) => void;
}

export interface ContentSlotContextResult {
  readonly exists: boolean;
  readonly registerDescription: (id: string) => void;
  readonly unregisterDescription: (id: string) => void;
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
      registerDescription(_id: string) {},
      unregisterDescription(_id: string) {}
    } satisfies ContentSlotContextResult;
  }

  return {
    get exists() {
      return true;
    },
    registerDescription(id: string) {
      return context.registerDescription(id);
    },
    unregisterDescription(id: string) {
      return context.unregisterDescription(id);
    }
  } satisfies ContentSlotContextResult;
}
