import { setContentSlotContext } from "./content-slot.context.js";
import type { ContentSlotContextValue } from "./content-slot.context.js";
import { setFieldStateContext } from "./field-state.context.js";

/** What the FieldState context reads from the owner. Absent flags are `false`. */
export interface FieldContextsSource {
  readonly id: string;
  readonly invalid: boolean;
  readonly disabled: boolean;
  readonly readonly?: boolean;
  readonly required?: boolean;
  readonly keepDescription?: boolean;
}

/**
 * Sets the two contexts of a field-like owner: the ContentSlot context, with `field` itself, so
 * the child Label, Description and FieldError register there, and the FieldState context, which
 * reads its flags from `source` and its ids from `field`. Every member is a getter, so it follows
 * the owner.
 */
export function setupFieldContexts(
  field: ContentSlotContextValue & {
    readonly labelId: string | undefined;
    readonly descriptionId: string | undefined;
    readonly errorId: string | undefined;
  },
  source: FieldContextsSource
): void {
  setContentSlotContext(field);

  setFieldStateContext({
    get invalid() {
      return source.invalid;
    },
    get disabled() {
      return source.disabled;
    },
    get readonly() {
      return source.readonly ?? false;
    },
    get required() {
      return source.required ?? false;
    },
    get id() {
      return source.id;
    },
    get labelId() {
      return field.labelId;
    },
    get descriptionId() {
      return field.descriptionId;
    },
    get errorId() {
      return field.errorId;
    },
    get keepDescription() {
      return source.keepDescription ?? false;
    }
  });
}
