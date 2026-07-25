<script lang="ts">
  import { Button } from "@shizen-ui/svelte";

  interface Props {
    instanceId: string;
    collapsed: boolean;
  }

  let { instanceId, collapsed = $bindable() }: Props = $props();

  function handleToggle() {
    collapsed = !collapsed;
    const wrapper = document.querySelector(`[data-code-block="${instanceId}"]`);
    if (wrapper) {
      wrapper.setAttribute("data-collapsed", collapsed.toString());
    }
  }
</script>

<Button variant="tertiary" size="sm" onclick={handleToggle} class="w-28">
  {collapsed ? "Expand code" : "Collapse code"}
</Button>
