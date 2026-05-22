import { getContext, setContext } from "svelte";
import type { SwitchSize } from "./switch.types.js";

export interface SwitchContextValue {
  readonly checked: boolean;
  readonly disabled: boolean;
  readonly invalid: boolean;
  readonly id: string;
  readonly size: SwitchSize;
  readonly hasContent: boolean;
  readonly hasLabel: boolean;
  readonly hasDescription: boolean;
  registerContent: () => void;
  registerLabel: () => void;
  registerDescription: () => void;
}

export interface SwitchContextResult {
  readonly checked: boolean;
  readonly disabled: boolean;
  readonly invalid: boolean;
  readonly id: string;
  readonly size: SwitchSize;
  readonly hasContent: boolean;
  readonly hasLabel: boolean;
  readonly hasDescription: boolean;
  registerContent: () => void;
  registerLabel: () => void;
  registerDescription: () => void;
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
      get invalid() {
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
      get hasLabel() {
        return false;
      },
      get hasDescription() {
        return false;
      },
      registerContent() {},
      registerLabel() {},
      registerDescription() {},
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
    get invalid() {
      return context.invalid;
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
    get hasLabel() {
      return context.hasLabel;
    },
    get hasDescription() {
      return context.hasDescription;
    },
    registerContent() {
      return context.registerContent();
    },
    registerLabel() {
      return context.registerLabel();
    },
    registerDescription() {
      return context.registerDescription();
    },
    get exists() {
      return true;
    }
  } satisfies SwitchContextResult;
}
