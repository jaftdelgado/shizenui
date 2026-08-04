import type { TextFieldControl } from "./text-field.context.js";

export interface NativeValidityConstraints {
  required: boolean;
  disabled: boolean;
  readonly: boolean;
  type?: string;
  pattern?: string;
  min?: string | number;
  max?: string | number;
  step?: string | number;
  minLength?: number;
  maxLength?: number;
}

export interface NativeValidityReporter {
  reportValidity(valid: boolean): void;
}

export function syncNativeValidity(options: {
  getRef: () => TextFieldControl | null;
  getValue: () => string;
  getConstraints: () => NativeValidityConstraints;
  reporters: NativeValidityReporter[];
}): void {
  $effect(() => {
    const value = options.getValue();
    const constraints = options.getConstraints();
    const ref = options.getRef();

    void value;
    void constraints.required;
    void constraints.disabled;
    void constraints.readonly;
    void constraints.type;
    void constraints.pattern;
    void constraints.min;
    void constraints.max;
    void constraints.step;
    void constraints.minLength;
    void constraints.maxLength;

    if (!ref) return;

    const valid = ref.validity.valid;
    for (const reporter of options.reporters) reporter.reportValidity(valid);
  });
}
