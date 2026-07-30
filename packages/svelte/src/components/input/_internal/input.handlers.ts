import type { TextFieldContextResult } from "../../text-field/_internal/text-field.context.js";
import type { InputInputEvent, InputInvalidEvent } from "./input.types.js";

export function createInputHandlers(options: {
  textFieldCtx: TextFieldContextResult;
  getOnInput: () => ((event: InputInputEvent) => void) | undefined;
  getOnInvalid: () => ((event: InputInvalidEvent) => void) | undefined;
}) {
  const { textFieldCtx, getOnInput, getOnInvalid } = options;

  function handleInput(event: InputInputEvent): void {
    textFieldCtx.reportValidity(event.currentTarget.validity.valid);
    getOnInput()?.(event);
  }

  function handleInvalid(event: InputInvalidEvent): void {
    textFieldCtx.reportInvalid();
    getOnInvalid()?.(event);
  }

  return { handleInput, handleInvalid };
}

export type InputHandlers = ReturnType<typeof createInputHandlers>;
