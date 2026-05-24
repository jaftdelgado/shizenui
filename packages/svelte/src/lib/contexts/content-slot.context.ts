import { getContext, setContext } from "svelte";

export interface ContentSlotContextValue {
  registerLabel: (id: string) => void;
  registerDescription: (id: string) => void;
  unregisterLabel: (id: string) => void;
  unregisterDescription: (id: string) => void;
  readonly labelId: string | undefined;
  readonly descriptionId: string | undefined;
}

export interface ContentSlotContextResult {
  readonly labelId: string | undefined;
  readonly descriptionId: string | undefined;
  readonly hasLabel: boolean;
  readonly hasDescription: boolean;
  readonly exists: boolean;
  registerLabel: (id: string) => void;
  registerDescription: (id: string) => void;
  unregisterLabel: (id: string) => void;
  unregisterDescription: (id: string) => void;
}

const CONTENT_SLOT_CONTEXT_KEY = Symbol("shizen:content-slot");

export function setContentSlotContext(value: ContentSlotContextValue): void {
  setContext(CONTENT_SLOT_CONTEXT_KEY, value);
}

export function useContentSlotContext(): ContentSlotContextResult {
  const context = getContext<ContentSlotContextValue | undefined>(
    CONTENT_SLOT_CONTEXT_KEY
  );

  if (!context) {
    return {
      get labelId() {
        return undefined;
      },
      get descriptionId() {
        return undefined;
      },
      get hasLabel() {
        return false;
      },
      get hasDescription() {
        return false;
      },
      get exists() {
        return false;
      },
      registerLabel(_id: string) {},
      registerDescription(_id: string) {},
      unregisterLabel(_id: string) {},
      unregisterDescription(_id: string) {}
    } satisfies ContentSlotContextResult;
  }

  return {
    get labelId() {
      return context.labelId;
    },
    get descriptionId() {
      return context.descriptionId;
    },
    get hasLabel() {
      return context.labelId !== undefined;
    },
    get hasDescription() {
      return context.descriptionId !== undefined;
    },
    get exists() {
      return true;
    },
    registerLabel(id: string) {
      return context.registerLabel(id);
    },
    registerDescription(id: string) {
      return context.registerDescription(id);
    },
    unregisterLabel(id: string) {
      return context.unregisterLabel(id);
    },
    unregisterDescription(id: string) {
      return context.unregisterDescription(id);
    }
  } satisfies ContentSlotContextResult;
}
