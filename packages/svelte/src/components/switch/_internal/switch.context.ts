import { getContext, setContext } from "svelte";
import type { SwitchSize } from "./switch.types.js";

export interface SwitchContextValue {
  readonly checked: boolean;
  readonly disabled: boolean;
  readonly readonly: boolean;
  readonly id: string;
  readonly size: SwitchSize;
  readonly hasContent: boolean;
  readonly hasDescription: boolean;
  registerContent: (id: string) => void;
  unregisterContent: (id: string) => void;
}

export interface SwitchContextResult {
  readonly checked: boolean;
  readonly disabled: boolean;
  readonly readonly: boolean;
  readonly id: string;
  readonly size: SwitchSize;
  readonly hasContent: boolean;
  readonly hasDescription: boolean;
  registerContent: (id: string) => void;
  unregisterContent: (id: string) => void;
  readonly exists: boolean;
}

const SWITCH_CONTEXT_KEY = Symbol("shizen:switch");

export function setSwitchContext(value: SwitchContextValue): void {
  setContext(SWITCH_CONTEXT_KEY, value);
}

export function useSwitchContext(): SwitchContextResult {
  const context = getContext<SwitchContextValue | undefined>(SWITCH_CONTEXT_KEY);

  if (!context) {
    return {
      get checked() {
        return false;
      },
      get disabled() {
        return false;
      },
      get readonly() {
        return false;
      },
      get id() {
        return "";
      },
      get size() {
        return "md" as SwitchSize;
      },
      get hasContent() {
        return false;
      },
      get hasDescription() {
        return false;
      },
      registerContent(_id: string) {},
      unregisterContent(_id: string) {},
      get exists() {
        return false;
      }
    } satisfies SwitchContextResult;
  }

  return {
    get checked() {
      return context.checked;
    },
    get disabled() {
      return context.disabled;
    },
    get readonly() {
      return context.readonly;
    },
    get id() {
      return context.id;
    },
    get size() {
      return context.size;
    },
    get hasContent() {
      return context.hasContent;
    },
    get hasDescription() {
      return context.hasDescription;
    },
    registerContent(id: string) {
      return context.registerContent(id);
    },
    unregisterContent(id: string) {
      return context.unregisterContent(id);
    },
    get exists() {
      return true;
    }
  } satisfies SwitchContextResult;
}
