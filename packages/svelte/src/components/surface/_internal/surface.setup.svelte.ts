import { setSurfaceContext } from "../../../lib/contexts/surface.context.js";
import type { SurfaceContextValue } from "../../../lib/contexts/surface.context.js";

export function setupSurfaceContext(): void {
  setSurfaceContext({ exists: true } satisfies SurfaceContextValue);
}
