import { getContext, setContext } from "svelte";
import type { ButtonVariants } from "@shizen-ui/styles";

export interface ButtonGroupContextValue {
  readonly variant?: ButtonVariants["variant"];
  readonly size?: ButtonVariants["size"];
  readonly disabled?: boolean;
}

export interface ButtonGroupContextResult {
  readonly variant: ButtonVariants["variant"] | undefined;
  readonly size: ButtonVariants["size"] | undefined;
  readonly disabled: boolean | undefined;
  readonly exists: boolean;
}

const BUTTON_GROUP_CONTEXT_KEY = Symbol("shizen:button-group");

export function setButtonGroupContext(value: ButtonGroupContextValue): void {
  setContext(BUTTON_GROUP_CONTEXT_KEY, value);
}

export function useButtonGroupContext(): ButtonGroupContextResult {
  const context = getContext<ButtonGroupContextValue | undefined>(BUTTON_GROUP_CONTEXT_KEY);

  if (!context) {
    return {
      get variant() {
        return undefined;
      },
      get size() {
        return undefined;
      },
      get disabled() {
        return undefined;
      },
      get exists() {
        return false;
      }
    } satisfies ButtonGroupContextResult;
  }

  return {
    get variant() {
      return context.variant;
    },
    get size() {
      return context.size;
    },
    get disabled() {
      return context.disabled;
    },
    get exists() {
      return true;
    }
  } satisfies ButtonGroupContextResult;
}
