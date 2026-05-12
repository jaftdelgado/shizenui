<script lang="ts">
  import { type Snippet } from "svelte";
  import { cn } from "../../../lib/utils";
  import type { HTMLAttributes } from "svelte/elements";
  import { switchGroupStyles } from "@shizen-ui/styles";
  import { useSwitchGroupContext } from "../_internal/index.js";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    children: Snippet;
  }

  let { children, class: className, ...rest }: Props = $props();

  const groupCtx = useSwitchGroupContext();
  const orientation = $derived(groupCtx.orientation);

  const styles = $derived(switchGroupStyles({ orientation }));
</script>

<div class={cn(styles.items(), className)} {...rest}>
  {@render children()}
</div>
