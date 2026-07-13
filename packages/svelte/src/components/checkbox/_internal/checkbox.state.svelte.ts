import { checkboxStyles } from "@shizen-ui/styles";
import { setCheckboxContext } from "./checkbox.context.js";
import { useCheckboxGroupContext } from "../../../contexts/internal/index.js";
import { setFieldStateContext, useFieldStateContext } from "../../../contexts/index.js";
import type { CheckboxState } from "./checkbox.types.js";

export interface CheckboxStateProps {
  readonly value: string | undefined;
  readonly disabled: boolean;
  readonly invalid: boolean;
  readonly name: string | undefined;
  readonly id: string;
  readonly checked: boolean;
  readonly indeterminate: boolean;
}

export function createCheckboxState(props: CheckboxStateProps) {
  const groupCtx = useCheckboxGroupContext();
  const parentFieldContext = useFieldStateContext();

  let inputElement = $state<HTMLInputElement | null>(null);

  const finalDisabled = $derived(
    parentFieldContext.exists
      ? parentFieldContext.disabled
      : groupCtx.exists
        ? groupCtx.disabled
        : props.disabled
  );

  const finalInvalid = $derived(
    parentFieldContext.exists
      ? parentFieldContext.invalid
      : groupCtx.exists
        ? groupCtx.invalid
        : props.invalid
  );

  const activeName = $derived(groupCtx.exists ? groupCtx.name : props.name);

  const isChecked = $derived.by<boolean>(() => {
    if (groupCtx.exists && props.value !== undefined) {
      return groupCtx.value.includes(props.value);
    }
    return props.checked;
  });

  const isIndeterminate = $derived.by<boolean>(() => {
    if (groupCtx.exists) return false;
    return props.indeterminate;
  });

  const checkboxState = $derived.by<CheckboxState>(() => {
    if (isIndeterminate) return "indeterminate";
    if (isChecked) return "checked";
    return "unchecked";
  });

  const styles = $derived(checkboxStyles());

  setCheckboxContext({
    get checked() {
      return isChecked;
    },
    get indeterminate() {
      return isIndeterminate;
    },
    get checkboxState() {
      return checkboxState;
    },
    get disabled() {
      return finalDisabled;
    },
    get invalid() {
      return finalInvalid;
    },
    get id() {
      return props.id;
    }
  });

  setFieldStateContext({
    get invalid() {
      return finalInvalid;
    },
    get disabled() {
      return finalDisabled;
    },
    get required() {
      return false;
    },
    get id() {
      return props.id;
    },
    get keepDescription() {
      return true;
    }
  });

  $effect(() => {
    if (inputElement) {
      inputElement.indeterminate = isIndeterminate;
    }
  });

  return {
    get inputElement() {
      return inputElement;
    },
    set inputElement(el: HTMLInputElement | null) {
      inputElement = el;
    },
    get finalDisabled() {
      return finalDisabled;
    },
    get finalInvalid() {
      return finalInvalid;
    },
    get activeName() {
      return activeName;
    },
    get isChecked() {
      return isChecked;
    },
    get isIndeterminate() {
      return isIndeterminate;
    },
    get checkboxState() {
      return checkboxState;
    },
    get styles() {
      return styles;
    },
    get groupCtx() {
      return groupCtx;
    },
    get value() {
      return props.value;
    },
    get id() {
      return props.id;
    }
  };
}

export type CheckboxStateInstance = ReturnType<typeof createCheckboxState>;
