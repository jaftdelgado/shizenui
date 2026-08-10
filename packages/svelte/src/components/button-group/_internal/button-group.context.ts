import { createContext } from "svelte";
import type { ButtonSize, ButtonVariant } from "../../button/_internal/button.types.js";

export interface ButtonGroupContextValue {
  readonly variant: ButtonVariant;
  readonly size: ButtonSize;
  readonly disabled: boolean;
}

export interface ButtonGroupContextResult {
  readonly variant: ButtonVariant;
  readonly size: ButtonSize;
  readonly disabled: boolean;
  readonly exists: boolean;
}

const [getButtonGroupContext, setButtonGroupContext] = createContext<ButtonGroupContextValue>();

function tryGetButtonGroupContext(): ButtonGroupContextValue | undefined {
  try {
    return getButtonGroupContext();
  } catch {
    return undefined;
  }
}

export { setButtonGroupContext };

export function useButtonGroupContext(): ButtonGroupContextResult {
  const context = tryGetButtonGroupContext();

  if (!context) {
    return {
      get variant() {
        return "primary" as ButtonVariant;
      },
      get size() {
        return "md" as ButtonSize;
      },
      get disabled() {
        return false;
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
