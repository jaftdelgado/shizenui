<script lang="ts">
  import { Button } from "@shizen-ui/svelte";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { UserAdd01Icon, CloudUploadIcon } from "@hugeicons/core-free-icons";
</script>

<div class="flex items-center gap-2">
  <Button>
    {#snippet startContent()}
      <HugeiconsIcon icon={UserAdd01Icon} size={20} />
    {/snippet}
    Add User
  </Button>

  <Button variant="tertiary">
    {#snippet endContent()}
      <HugeiconsIcon icon={CloudUploadIcon} size={20} />
    {/snippet}
    Upload Files
  </Button>
</div>
