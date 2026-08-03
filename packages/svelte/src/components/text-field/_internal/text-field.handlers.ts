import type { SubmissionInvalidState } from "../../../lib/runes/index.js";

/**
 * Structural interface, not imported from any specific context module, so this
 * file does not create a dependency on InputGroupContextResult (which would
 * invert the dependency direction: text-field/_internal should not know about
 * input-group). Both TextFieldContextResult and InputGroupContextResult already
 * satisfy this shape.
 */
export interface ValidityReporter {
  reportValidity(valid: boolean): void;
  reportInvalid(): void;
}

/**
 * Consolidates the native-control <-> validity-reporting wiring shared by
 * <Input> and <InputGroup.Input>/<InputGroup.TextArea>. Lives here (not in
 * input/_internal or input-group/_internal) because the logic is conceptually
 * about reporting into a TextFieldContext-shaped contract, even when the DOM
 * event is dispatched by a sibling component.
 *
 * `reporters` accepts more than one target because InputGroup standalone
 * needs to report to both its own InputGroupContext (always) and an
 * ambient TextFieldContext (only if the InputGroup happens to sit inside one).
 *
 * `submissionInvalid` is optional: only the component that owns the
 * SubmissionInvalidState instance (Input.svelte, InputGroup.svelte — both
 * roots) passes it. Compound children of InputGroup do not own one; their
 * invalidity reporting travels entirely through `reporters`.
 */
export function createTextFieldControlHandlers<T extends HTMLElement>(options: {
  reporters: ValidityReporter[];
  submissionInvalid?: SubmissionInvalidState;
  getOnInput: () => ((event: InputEvent & { currentTarget: T }) => void) | undefined;
  getOnInvalid: () => ((event: Event & { currentTarget: T }) => void) | undefined;
}) {
  const { reporters, submissionInvalid, getOnInput, getOnInvalid } = options;

  function handleInput(event: Event & { currentTarget: T }): void {
    const target = event.currentTarget as T & { validity: ValidityState };
    const valid = target.validity.valid;

    for (const reporter of reporters) reporter.reportValidity(valid);
    if (valid) submissionInvalid?.clear();

    getOnInput()?.(event as InputEvent & { currentTarget: T });
  }

  function handleInvalid(event: Event & { currentTarget: T }): void {
    for (const reporter of reporters) reporter.reportInvalid();
    submissionInvalid?.set(true);

    getOnInvalid()?.(event);
  }

  return { handleInput, handleInvalid };
}

export type TextFieldControlHandlers = ReturnType<typeof createTextFieldControlHandlers>;
