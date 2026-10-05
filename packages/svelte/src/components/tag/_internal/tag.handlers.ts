import { tick } from "svelte";
import { getRovingCandidates } from "../../../lib/utils/index.js";
import type { TagStateInstance } from "./tag.state.svelte.js";
import type { TagClickEvent } from "./tag.types.js";

export function createTagHandlers(options: {
  state: TagStateInstance;
  focus: { onKeyDown: () => void; onMouseDown: () => void; onFocus: () => void };
  getRef: () => HTMLDivElement | null;
  getOnClick?: () => ((e: TagClickEvent) => void) | undefined;
}) {
  const { state, focus, getRef, getOnClick } = options;

  function handleClick(e: TagClickEvent): void {
    state.toggle();
    getOnClick?.()?.(e);
  }

  function handleFocus(): void {
    focus.onFocus();
    state.groupCtx.setActiveId(state.id);
  }

  function handleMouseDown(e: MouseEvent & { currentTarget: HTMLDivElement }): void {
    focus.onMouseDown();
    if (!state.isInteractive) return;
    e.currentTarget.setAttribute("data-pressed", "true");
  }

  function handleMouseUp(e: MouseEvent & { currentTarget: HTMLDivElement }): void {
    e.currentTarget.removeAttribute("data-pressed");
  }

  function handleMouseLeave(e: MouseEvent & { currentTarget: HTMLDivElement }): void {
    e.currentTarget.removeAttribute("data-pressed");
  }

  function handleKeydown(e: KeyboardEvent & { currentTarget: HTMLDivElement }): void {
    if (e.type === "keydown") focus.onKeyDown();

    if (e.target !== e.currentTarget) return;

    if (e.type === "keydown" && (e.key === "Delete" || e.key === "Backspace")) {
      if (!state.canRemove) return;
      e.preventDefault();
      requestRemove();
      return;
    }

    if (e.key !== "Enter" && e.key !== " ") return;
    if (!state.isInteractive) return;

    if (e.type === "keydown") {
      e.preventDefault();
      if (e.repeat) return;
      e.currentTarget.setAttribute("data-pressed", "true");
      return;
    }

    if (!e.currentTarget.hasAttribute("data-pressed")) return;
    e.currentTarget.removeAttribute("data-pressed");
    state.toggle();
  }

  function resolveFocusSuccessor(): HTMLElement | undefined {
    const ref = getRef();
    if (!ref || !ref.contains(document.activeElement)) return undefined;

    const grid = ref.closest<HTMLElement>('[role="grid"]');
    if (!grid) return undefined;

    const rows = getRovingCandidates<HTMLElement>(grid, '[role="row"]:not([data-disabled])');
    const index = rows.indexOf(ref);
    if (index === -1) return undefined;

    return rows[index + 1] ?? rows[index - 1];
  }

  function requestRemove(): void {
    if (!state.canRemove) return;

    const successor = resolveFocusSuccessor();

    state.remove();

    if (!successor) return;

    state.groupCtx.setActiveId(successor.id);
    void tick().then(() => {
      if (successor.isConnected) successor.focus();
    });
  }

  return {
    handleClick,
    handleFocus,
    handleMouseDown,
    handleMouseUp,
    handleMouseLeave,
    handleKeydown,
    requestRemove
  };
}

export type TagHandlers = ReturnType<typeof createTagHandlers>;
