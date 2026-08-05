import { createContext } from "svelte";

export interface SurfaceContextValue {
  readonly exists: true;
}

export interface SurfaceContextResult {
  readonly exists: boolean;
}

export function resolveSurfaceVariant<T extends string>(
  localVariant: T | undefined,
  surfaceContext: SurfaceContextResult,
  defaultVariant: T,
  surfaceVariant: T
): T {
  return localVariant ?? (surfaceContext.exists ? surfaceVariant : defaultVariant);
}

const [getSurfaceContext, setSurfaceContext] = createContext<SurfaceContextValue>();

function tryGetSurfaceContext(): SurfaceContextValue | undefined {
  try {
    return getSurfaceContext();
  } catch {
    return undefined;
  }
}

export { setSurfaceContext };

export function useSurfaceContext(): SurfaceContextResult {
  const context = tryGetSurfaceContext();

  if (!context) {
    return {
      get exists() {
        return false;
      }
    } satisfies SurfaceContextResult;
  }

  return {
    get exists() {
      return context.exists;
    }
  } satisfies SurfaceContextResult;
}
