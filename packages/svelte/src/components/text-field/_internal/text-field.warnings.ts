import { warnIf } from "../../../lib/runes/index.js";
import type { TextFieldContextResult } from "./text-field.context.js";
import type { TextFieldSize, TextFieldVariant } from "./text-field.types.js";
import { isTextFieldControlType } from "./text-field.types.js";

type OverrideValue = boolean | TextFieldSize | TextFieldVariant | undefined;

type OverridableProperty = "disabled" | "invalid" | "readonly" | "required" | "size" | "variant";

const OVERRIDE_DEFINITIONS: {
  property: OverridableProperty;
  getRaw: (ctx: TextFieldContextResult) => OverrideValue;
}[] = [
  { property: "disabled", getRaw: (ctx) => ctx.rawDisabled },
  { property: "invalid", getRaw: (ctx) => ctx.rawInvalid },
  { property: "readonly", getRaw: (ctx) => ctx.rawReadonly },
  { property: "required", getRaw: (ctx) => ctx.rawRequired },
  { property: "size", getRaw: (ctx) => ctx.rawSize },
  { property: "variant", getRaw: (ctx) => ctx.rawVariant }
];

export function setupTextFieldWarnings(options: {
  context: TextFieldContextResult;
  hasChildren: () => boolean;
}): void {
  warnIf(
    () => !options.hasChildren(),
    "TextField",
    "No children provided. Add a <Label /> and either <Input /> or <InputGroup />."
  );

  warnIfTextFieldHasNoAccessibleName(options.context);
}

export function warnIfTextFieldPropsOverride(options: {
  component: string;
  context: TextFieldContextResult;
  props: Partial<Record<OverridableProperty, () => OverrideValue>>;
}): void {
  for (const { property, getRaw } of OVERRIDE_DEFINITIONS) {
    const getLocal = options.props[property];
    if (!getLocal) continue;

    warnIf(
      () => {
        if (!options.context.exists) return false;
        const local = getLocal();
        return local !== undefined && local !== getRaw(options.context);
      },
      options.component,
      `\`${property}\` was provided locally but is ignored because this component is inside ` +
        `a <TextField>, which is the single source of truth. Set \`${property}\` on <TextField> instead.`
    );
  }
}

export function warnIfUnsupportedTextFieldControlType(
  getType: () => unknown,
  component: string
): void {
  warnIf(
    () => getType() !== undefined && !isTextFieldControlType(getType()),
    component,
    'Unsupported input type. Falling back to type="text".'
  );
}

export function warnIfTextFieldHasNoAccessibleName(context: TextFieldContextResult): void {
  warnIf(
    () => context.exists && !!context.control && !context.hasLabel && !context.hasAccessibleName,
    "TextField",
    "No accessible name found. Add a <Label>, `aria-label`, or `aria-labelledby`."
  );
}
