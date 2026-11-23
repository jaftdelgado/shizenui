type Primitive = string | number | boolean | undefined;

/** A styles function whose result is an object of slot functions, as `tv` builds with `slots`. */
type SlotStyles = (props?: any) => Record<string, () => string>;

/** The variant props of a styles function, without the `class` overrides. */
type VariantProps<S extends SlotStyles> = Omit<
  NonNullable<Parameters<S>[0]>,
  "class" | "className"
>;

/** Turns every prop whose type is not a primitive into `never`, so passing it is a type error. */
type PrimitiveOnly<P> = { [K in keyof P]: P[K] extends Primitive ? P[K] : never };

/** The class string of each slot of a styles function. */
export type SlotClasses<S extends SlotStyles> = Readonly<{ [K in keyof ReturnType<S>]: string }>;

/**
 * Resolves every slot function to its class string. Each slot call runs the variants and
 * `tailwind-merge`, so doing it once per slot, here, keeps it out of every render of every item.
 * The result is frozen: it is shared by everything that asks for the same classes.
 */
export function resolveSlotClasses<T extends Record<string, () => string>>(
  slots: T
): Readonly<{ [K in keyof T]: string }> {
  const classes: Record<string, string> = {};
  for (const [name, slot] of Object.entries(slots)) classes[name] = slot();
  return Object.freeze(classes) as Readonly<{ [K in keyof T]: string }>;
}

/**
 * Memoizes the classes a styles function resolves to, by its variant props, so every item of a
 * list that asks for the same variants shares one result instead of building its own.
 *
 * Calls with the same props return the same object, whatever the order of the keys, and a prop
 * that is absent is the same as one that is `undefined`. The cache is never emptied, which is
 * correct because the combinations of variants are finite.
 *
 * Only primitive values (`string`, `number`, `boolean`, `undefined`) are accepted: they are what
 * the key is built from. This leaves out `class`, which would also make the cache unbounded.
 *
 * @example
 * const getTagSlotClasses = memoizeSlotClasses(tagStyles);
 * getTagSlotClasses({ variant: "secondary", size: "sm" }).base;
 */
export function memoizeSlotClasses<S extends SlotStyles>(
  styles: S
): (props?: PrimitiveOnly<VariantProps<S>>) => SlotClasses<S> {
  const cache = new Map<string, SlotClasses<S>>();

  return (props = {} as PrimitiveOnly<VariantProps<S>>) => {
    const key = JSON.stringify(
      Object.entries(props)
        .filter(([, value]) => value !== undefined)
        .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
    );

    let result = cache.get(key);
    if (result === undefined) {
      result = resolveSlotClasses(styles(props)) as SlotClasses<S>;
      cache.set(key, result);
    }
    return result;
  };
}
