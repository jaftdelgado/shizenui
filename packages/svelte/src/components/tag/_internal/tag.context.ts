import { createContext } from "svelte";

export interface TagContextValue {
  readonly disabled: boolean;
  readonly isRemovable: boolean;
  readonly textValue: string | undefined;
  readonly id: string | undefined;
  readonly requestRemove: () => void;
}

export interface TagContextResult extends TagContextValue {
  readonly exists: boolean;
}

const [getTagContext, setTagContext] = createContext<TagContextValue>();

function tryGetTagContext(): TagContextValue | undefined {
  try {
    return getTagContext();
  } catch {
    return undefined;
  }
}

export { setTagContext };

export function useTagContext(): TagContextResult {
  const context = tryGetTagContext();

  if (!context) {
    return {
      get disabled() {
        return false;
      },
      get isRemovable() {
        return false;
      },
      get textValue() {
        return undefined;
      },
      get id() {
        return undefined;
      },
      requestRemove() {},
      get exists() {
        return false;
      }
    } satisfies TagContextResult;
  }

  return {
    get disabled() {
      return context.disabled;
    },
    get isRemovable() {
      return context.isRemovable;
    },
    get textValue() {
      return context.textValue;
    },
    get id() {
      return context.id;
    },
    requestRemove() {
      return context.requestRemove();
    },
    get exists() {
      return true;
    }
  } satisfies TagContextResult;
}
