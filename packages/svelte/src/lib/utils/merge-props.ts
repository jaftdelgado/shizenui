import { cn } from "./cn.js";
import type { ClassValue } from "clsx";

type MergeableProps = Record<string, unknown>;

const NON_EVENT_ON_KEYS = new Set(["once"]);

function isDomEventKey(key: string): boolean {
  return (
    key.length > 2 &&
    key.startsWith("on") &&
    key === key.toLowerCase() &&
    !NON_EVENT_ON_KEYS.has(key)
  );
}

function composeHandlers<E extends { defaultPrevented?: boolean }>(
  internal: ((event: E) => void) | undefined,
  external: ((event: E) => void) | undefined
): ((event: E) => void) | undefined {
  if (!internal) return external;
  if (!external) return internal;

  return (event: E) => {
    internal(event);
    if (event?.defaultPrevented) return;
    external(event);
  };
}

export function mergeProps<A extends MergeableProps, B extends MergeableProps>(
  internalProps: A,
  rest: B
): A & B {
  const merged: Record<string, unknown> = { ...rest, ...internalProps };

  for (const key of Object.keys(internalProps)) {
    if (!(key in rest)) continue;

    if (key === "class") {
      merged.class = cn(internalProps.class as ClassValue, rest.class as ClassValue);
      continue;
    }

    if (isDomEventKey(key)) {
      const internalHandler = internalProps[key];
      const restHandler = rest[key];

      if (typeof internalHandler === "function" && typeof restHandler === "function") {
        merged[key] = composeHandlers(
          internalHandler as (event: unknown) => void,
          restHandler as (event: unknown) => void
        );
      }
    }
  }

  return merged as A & B;
}
