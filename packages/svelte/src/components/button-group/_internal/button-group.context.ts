import { createContext } from "svelte";
import type { ButtonVariants } from "@shizen-ui/styles";

export interface ButtonGroupContextValue {
  readonly variant: NonNullable<ButtonVariants["variant"]>;
  readonly size: NonNullable<ButtonVariants["size"]>;
  readonly disabled: boolean;
}

export interface ButtonGroupContextResult {
  readonly variant: NonNullable<ButtonVariants["variant"]>;
  readonly size: NonNullable<ButtonVariants["size"]>;
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
        return "primary" as NonNullable<ButtonVariants["variant"]>;
      },
      get size() {
        return "md" as NonNullable<ButtonVariants["size"]>;
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
