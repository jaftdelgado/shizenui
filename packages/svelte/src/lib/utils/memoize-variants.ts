type Primitive = string | number | boolean | undefined;

/** The variant props of a styles function, without the `class` overrides. */
type VariantProps<S extends (props?: any) => unknown> = Omit<
  NonNullable<Parameters<S>[0]>,
  "class" | "className"
>;

/** Turns every prop whose type is not a primitive into `never`, so passing it is a type error. */
type PrimitiveOnly<P> = { [K in keyof P]: P[K] extends Primitive ? P[K] : never };

/**
 * Memoizes a styles function by its variant props, so every item of a list that asks for the same
 * variants shares one result instead of building its own.
 *
 * Calls with the same props return the same object, whatever the order of the keys, and a prop
 * that is absent is the same as one that is `undefined`. The cache is never emptied, which is
 * correct because the combinations of variants are finite.
 *
 * Only primitive values (`string`, `number`, `boolean`, `undefined`) are accepted: they are what
 * the key is built from. This leaves out `class`, which would also make the cache unbounded.
 *
 * @example
 * const getTagSlots = memoizeVariants(tagStyles);
 * getTagSlots({ variant: "secondary", size: "sm" });
 */
export function memoizeVariants<S extends (props?: any) => unknown>(
  styles: S
): (props?: PrimitiveOnly<VariantProps<S>>) => ReturnType<S> {
  const cache = new Map<string, ReturnType<S>>();

  return (props = {} as PrimitiveOnly<VariantProps<S>>) => {
    const key = JSON.stringify(
      Object.entries(props)
        .filter(([, value]) => value !== undefined)
        .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
    );

    let result = cache.get(key);
    if (result === undefined) {
      result = styles(props) as ReturnType<S>;
      cache.set(key, result);
    }
    return result;
  };
}
