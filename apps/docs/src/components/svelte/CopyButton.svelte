<script lang="ts">
  import { Button } from "@shizen-ui/svelte";
  import Icon from "@components/svelte/Icon.svelte";
  import { Copy01Icon, Tick02Icon } from "@hugeicons/core-free-icons";

  interface Props {
    text: string;
  }

  let { text }: Props = $props();

  let copied = $state(false);

  async function copy() {
    await navigator.clipboard.writeText(text);
    copied = true;
    setTimeout(() => (copied = false), 2000);
  }
</script>

<Button
  size="sm"
  variant="tertiary"
  iconOnly
  aria-label={copied ? "Copied!" : "Copy code"}
  onclick={copy}
  class="text-secondary-text [--btn-bg-hover:var(--color-ghost-hover)] [--btn-bg-pressed:var(--color-ghost-pressed)] [--btn-bg:var(--color-component)]"
>
  {#if copied}
    <Icon icon={Tick02Icon} />
  {/if}
  {#if !copied}
    <Icon icon={Copy01Icon} />
  {/if}
</Button>
