<script lang="ts">
  import { Button } from "@shizen-ui/svelte";
</script>

<div class="flex max-w-md flex-wrap items-center gap-4">
  <Button disabled={true} variant="primary">Primary</Button>
  <Button disabled={true} variant="secondary">Secondary</Button>
  <Button disabled={true} variant="tertiary">Tertiary</Button>
  <Button disabled={true} variant="outline">Outline</Button>
  <Button disabled={true} variant="ghost">Ghost</Button>
  <Button disabled={true} variant="danger">Danger</Button>
  <Button disabled={true} variant="soft-danger">Soft Danger</Button>
</div>
