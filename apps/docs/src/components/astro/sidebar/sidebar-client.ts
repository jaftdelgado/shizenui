// Client behaviour for the Astro sidebar port (Fluid Functionalism, MIT).
// One wrapper = one sidebar. State is kept as attributes on the wrapper so the
// CSS in styles/sidebar.css can drive every visual change.

export const SIDEBAR_COOKIE_NAME = "sidebar_state";
export const SIDEBAR_WIDTH_COOKIE_NAME = "sidebar_width";
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
export const SIDEBAR_MIN_WIDTH = 160;
export const SIDEBAR_MAX_WIDTH = 360;
/** Dragging this far past the minimum collapses instead of bottoming out. */
export const SIDEBAR_COLLAPSE_SLOP = 56;
const MOBILE_QUERY = "(width < 80rem)";
const SCROLL_KEY = "sidebar_scroll";
/** Longest open/close transition in sidebar.css (240ms) plus a frame of slack. */
const ANIMATION_MS = 260;

const writeCookie = (name: string, value: string) => {
  document.cookie = `${name}=${value}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}; samesite=lax`;
};

const isTypingTarget = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT" ||
    target.isContentEditable
  );
};

function setupSidebar(wrapper: HTMLElement) {
  if (wrapper.dataset.sidebarReady) return;
  wrapper.dataset.sidebarReady = "";

  const sidebar = wrapper.querySelector<HTMLElement>(':scope > [data-slot="sidebar"]');
  const inset = wrapper.querySelector<HTMLElement>(':scope > [data-slot="sidebar-inset"]');
  const scrim = wrapper.querySelector<HTMLElement>(':scope > [data-sidebar="scrim"]');
  const content = sidebar?.querySelector<HTMLElement>('[data-sidebar="content"]');
  const triggers = () => wrapper.querySelectorAll<HTMLButtonElement>('[data-sidebar="trigger"]');
  const persist = wrapper.dataset.persist === "true";
  const shortcut = wrapper.dataset.shortcut || null;
  const mobileQuery = window.matchMedia(MOBILE_QUERY);
  const collapsible = sidebar?.dataset.collapsible !== "none";

  const isOpen = () => wrapper.dataset.state !== "collapsed";
  const isMobileOpen = () => wrapper.hasAttribute("data-mobile-open");

  const syncTriggers = () => {
    const expanded = mobileQuery.matches ? isMobileOpen() : isOpen();
    for (const trigger of triggers()) {
      trigger.setAttribute("aria-expanded", String(expanded));
      trigger.title = `${expanded ? "Collapse" : "Expand"} sidebar${shortcut ? ` (${shortcut})` : ""}`;
    }
  };

  // Flags the wrapper while a transition runs, so the CSS can promote the
  // moving parts to their own layers (will-change) only for that time.
  let animatingTimer = 0;
  const markAnimating = () => {
    wrapper.setAttribute("data-animating", "");
    clearTimeout(animatingTimer);
    animatingTimer = window.setTimeout(
      () => wrapper.removeAttribute("data-animating"),
      ANIMATION_MS
    );
  };

  const setOpen = (open: boolean) => {
    if (!wrapper.hasAttribute("data-resizing")) markAnimating();
    wrapper.dataset.state = open ? "expanded" : "collapsed";
    if (persist) writeCookie(SIDEBAR_COOKIE_NAME, String(open));
    syncTriggers();
    wrapper.dispatchEvent(new CustomEvent("sidebar:openchange", { detail: { open } }));
  };

  // ─── Mobile drawer ───────────────────────────────────────────────────
  let restoreFocus: HTMLElement | null = null;

  const setMobileOpen = (open: boolean) => {
    if (!sidebar || open === isMobileOpen()) return;
    markAnimating();
    wrapper.toggleAttribute("data-mobile-open", open);
    document.documentElement.toggleAttribute("data-sidebar-lock", open);
    inset?.toggleAttribute("inert", open);
    if (open) {
      sidebar.setAttribute("role", "dialog");
      sidebar.setAttribute("aria-modal", "true");
      restoreFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      // Focus the panel itself, not the first row: a focused nav link reads
      // as a selection the moment the drawer opens.
      sidebar.focus({ preventScroll: true });
    } else {
      sidebar.removeAttribute("role");
      sidebar.removeAttribute("aria-modal");
      restoreFocus?.focus({ preventScroll: true });
      restoreFocus = null;
    }
    syncTriggers();
  };

  const toggle = () => {
    if (!collapsible) return;
    if (mobileQuery.matches) setMobileOpen(!isMobileOpen());
    else setOpen(!isOpen());
  };

  wrapper.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target.closest('[data-sidebar="trigger"]')) toggle();
    // Following a link inside the drawer closes it.
    else if (isMobileOpen() && target.closest('[data-slot="sidebar"] a[href]'))
      setMobileOpen(false);
  });

  scrim?.addEventListener("click", () => setMobileOpen(false));

  sidebar?.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isMobileOpen()) {
      event.stopPropagation();
      setMobileOpen(false);
    }
  });

  mobileQuery.addEventListener("change", () => {
    // Crossing the breakpoint swaps drawer and rail layouts: snap, don't
    // animate between them. The change event runs before this frame's style
    // pass, so the flag is in place for it; two frames later it is lifted.
    wrapper.setAttribute("data-instant", "");
    requestAnimationFrame(() =>
      requestAnimationFrame(() => wrapper.removeAttribute("data-instant"))
    );
    if (!mobileQuery.matches) setMobileOpen(false);
    syncTriggers();
  });

  // ─── Bare-key shortcut ("[" by default) ──────────────────────────────
  if (shortcut && collapsible) {
    window.addEventListener("keydown", (event) => {
      if (event.key.toLowerCase() !== shortcut.toLowerCase()) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (isTypingTarget(event.target)) return;
      if (event.defaultPrevented) return;
      event.preventDefault();
      toggle();
    });
  }

  // ─── Rail: drag to resize, click to collapse ─────────────────────────
  const rail = sidebar?.querySelector<HTMLButtonElement>('[data-sidebar="rail"]');
  if (rail && sidebar) {
    const side = sidebar.dataset.side === "right" ? "right" : "left";
    let drag: { startX: number; startWidth: number; moved: boolean; collapsed: boolean } | null =
      null;

    const setWidth = (px: number) => wrapper.style.setProperty("--sidebar-width", `${px}px`);

    rail.addEventListener("pointerdown", (event) => {
      if (event.button !== 0) return;
      // Without this the browser starts a native selection/drag on the first
      // move and pointercancels the resize.
      event.preventDefault();
      drag = {
        startX: event.clientX,
        startWidth: sidebar.offsetWidth,
        moved: false,
        collapsed: false
      };
      rail.setPointerCapture(event.pointerId);
    });

    rail.addEventListener("pointermove", (event) => {
      if (!drag) return;
      const dx = event.clientX - drag.startX;
      if (!drag.moved && Math.abs(dx) < 4) return;
      if (!drag.moved) {
        drag.moved = true;
        wrapper.setAttribute("data-resizing", "");
      }
      const raw = drag.startWidth + (side === "left" ? dx : -dx);
      // Well past the minimum: preview the collapse, but keep the drag alive
      // so pulling back re-expands — an overshoot only commits on release.
      if (raw < SIDEBAR_MIN_WIDTH - SIDEBAR_COLLAPSE_SLOP) {
        if (!drag.collapsed) {
          drag.collapsed = true;
          setWidth(SIDEBAR_MIN_WIDTH);
          wrapper.removeAttribute("data-resizing"); // let the collapse animate
          setOpen(false);
        }
        return;
      }
      if (drag.collapsed) {
        drag.collapsed = false;
        wrapper.setAttribute("data-resizing", "");
        setOpen(true);
      }
      setWidth(Math.round(Math.max(SIDEBAR_MIN_WIDTH, Math.min(SIDEBAR_MAX_WIDTH, raw))));
    });

    const endDrag = (event: PointerEvent, cancelled: boolean) => {
      const current = drag;
      drag = null;
      if (rail.hasPointerCapture(event.pointerId)) rail.releasePointerCapture(event.pointerId);
      wrapper.removeAttribute("data-resizing");
      if (!current) return;
      // A press that never became a drag is the collapse click.
      if (!current.moved) {
        if (!cancelled) toggle();
        return;
      }
      if (persist) {
        const width = wrapper.style.getPropertyValue("--sidebar-width").trim();
        if (width) writeCookie(SIDEBAR_WIDTH_COOKIE_NAME, width);
      }
    };

    rail.addEventListener("pointerup", (event) => endDrag(event, false));
    rail.addEventListener("pointercancel", (event) => endDrag(event, true));
  }

  // ─── Keep the nav list's own scroll position across page loads ───────
  if (content) {
    const saved = sessionStorage.getItem(SCROLL_KEY);
    if (saved) content.scrollTop = Number(saved);
    window.addEventListener("pagehide", () =>
      sessionStorage.setItem(SCROLL_KEY, String(content.scrollTop))
    );
  }

  syncTriggers();
}

export function initSidebars() {
  document
    .querySelectorAll<HTMLElement>('[data-slot="sidebar-wrapper"]')
    .forEach((wrapper) => setupSidebar(wrapper));
}
