import { getContext, setContext } from "svelte";

export interface ContentSlotContextValue {
  registerDescription: (id: string) => void;
  unregisterDescription: (id: string) => void;
}

export interface ContentSlotContextResult {
  readonly exists: boolean;
  registerDescription: (id: string) => void;
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
      get exists() { return false; },
      registerDescription(_id: string) {},
      unregisterDescription(_id: string) {}
    } satisfies ContentSlotContextResult;
  }

  return {
    get exists() { return true; },
    registerDescription(id: string) { return context.registerDescription(id); },
    unregisterDescription(id: string) { return context.unregisterDescription(id); }
  } satisfies ContentSlotContextResult;
}
