import { onMount } from "svelte";

/**
 * Whether the component has mounted: `false` on the server and in the first client render, `true`
 * from the moment it mounts. Reading it in markup gives the same result on the server and in the
 * first client render, so hydration sees no mismatch. Call it while a component initializes.
 */
export function createMounted(): { readonly current: boolean } {
  let mounted = $state(false);
  onMount(() => {
    mounted = true;
  });
  return {
    get current() {
      return mounted;
    }
  };
}
