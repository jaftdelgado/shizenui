<script lang="ts">
  import { Button } from "@shizen-ui/svelte";

  import Icon from "@components/svelte/Icon.svelte";
  import { Download01Icon } from "@hugeicons/core-free-icons";

  let exporting = $state(false);

  async function handleExport() {
    exporting = true;
    await new Promise((r) => setTimeout(r, 2000));
    exporting = false;
  }
</script>

<Button variant="primary" loading={exporting} onclick={handleExport}>
  {#snippet startContent()}
    <Icon icon={Download01Icon} />
  {/snippet}
  {exporting ? "Exporting..." : "Export File"}
</Button>
