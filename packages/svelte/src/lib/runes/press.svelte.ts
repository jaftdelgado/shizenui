import { isFromFocusableChild } from "../utils/focus.js";

/** A key that activates a button: `Enter` or `Space` (`" "`). */
export type ActivationKey = "Enter" | " ";

const ACTIVATION_KEYS: readonly ActivationKey[] = ["Enter", " "];

function isActivationKey(key: string): key is ActivationKey {
  return key === "Enter" || key === " ";
}

export interface PressStateOptions {
  /** Whether presses are ignored. It is read on every event, so it can change at any time. */
  isDisabled: () => boolean;
  /**
   * The keys that mark the press and activate. `Enter` and `Space` by default.
   *
   * A key that is left out is still cancelled (see the class), it just does nothing: no pressed
   * state and no activation. A checkbox uses `[" "]` because the ARIA checkbox pattern only
   * activates with `Space`.
   */
  keys?: readonly ActivationKey[];
}

/**
 * The pressed state of a component, and its activation from the keyboard.
 *
 * One event per responsibility, the same in every component:
 *
 * - Activate: `click`. It is the handler of each component, and the only place that activates.
 * - Pressed state and keyboard activation: `pointer*`, `keydown` and `keyup` of `Enter` and
 *   `Space`, and `blur`. Only here. Which of the two keys activate is the `keys` option.
 * - Stop the browser from moving focus: `mousedown` with `preventDefault()`. Only where it
 *   already exists, as a documented exception.
 *
 * Activation by pointer stays on the native `click` and never happens on `pointerup`: screen
 * readers and voice control activate with a `click` that has no pointer events at all, so `click`
 * is the one event that reaches every user. A non-button element has no native keyboard `click`,
 * and on a button `keydown` calls `preventDefault()` to stop it, so `keyup` of `Enter` or `Space`
 * calls `click()`: the activation then goes through the component's click handler, and the
 * consumer's `onclick`, exactly like a pointer press.
 *
 * `Enter` and `Space` always belong to `PressState`: `keydown` cancels their native action even
 * while presses are disabled, and even for a key that is not in `keys`. These components are a
 * `<button>` that is not always disabled natively (`readonly` only disables the press), and
 * without the cancel the browser would activate it on its own: `Enter` on `keydown`, and again
 * for every repeat while the key is held. Every other key is left to the browser.
 *
 * On touch the browser keeps the pointer captured by the element where the finger went down, and
 * `pointerleave` is not sent while it is captured: sliding the finger out would leave the element
 * pressed. `pointerdown` releases that implicit capture, so the press ends as soon as the finger
 * leaves. `pointercancel` (the browser takes the touch to scroll) ends it too.
 *
 * `PressState` does not write to the DOM: each component renders `isPressed` in the attribute
 * format its styles expect.
 *
 * @example
 * const press = new PressState({ isDisabled: () => disabled });
 * const props = $derived(
 *   mergeProps({ ...press.props, "data-pressed": presence(press.isPressed) }, rest)
 * );
 */
export class PressState {
  readonly #isDisabled: () => boolean;
  readonly #keys: readonly ActivationKey[];

  /** Whether the element is pressed right now, by a pointer or by `Enter` / `Space`. */
  isPressed = $state(false);

  constructor(options: PressStateOptions) {
    this.#isDisabled = options.isDisabled;
    this.#keys = options.keys ?? ACTIVATION_KEYS;
  }

  readonly #onpointerdown = (e: PointerEvent & { currentTarget: HTMLElement }): void => {
    if (e.button !== 0 || this.#isDisabled()) return;
    // A press on a focusable child (the remove button of a tag) belongs to the child, as a key does.
    if (isFromFocusableChild(e.target, e.currentTarget)) return;

    // Touch: without this the element keeps the pointer and never gets pointerleave. The browser
    // captures it on the element under the finger, which may be a child of this one.
    const target = e.target as Element;
    if (target.hasPointerCapture(e.pointerId)) target.releasePointerCapture(e.pointerId);
    this.isPressed = true;
  };

  readonly #release = (): void => {
    this.isPressed = false;
  };

  readonly #onkeydown = (e: KeyboardEvent & { currentTarget: HTMLElement }): void => {
    // A key pressed on a child (the remove button of a tag) belongs to the child.
    if (e.target !== e.currentTarget) return;
    if (!isActivationKey(e.key)) return;

    e.preventDefault();
    if (this.#isDisabled() || !this.#keys.includes(e.key) || e.repeat) return;
    this.isPressed = true;
  };

  readonly #onkeyup = (e: KeyboardEvent & { currentTarget: HTMLElement }): void => {
    if (e.target !== e.currentTarget) return;
    if (!isActivationKey(e.key) || !this.#keys.includes(e.key)) return;
    if (!this.isPressed) return;

    this.isPressed = false;
    if (this.#isDisabled()) return;
    e.currentTarget.click();
  };

  /** The event props to spread on the element. The handlers are the same for the whole life of the state. */
  readonly props = {
    onpointerdown: this.#onpointerdown,
    onpointerup: this.#release,
    onpointerleave: this.#release,
    onpointercancel: this.#release,
    onkeydown: this.#onkeydown,
    onkeyup: this.#onkeyup,
    onblur: this.#release
  };
}
