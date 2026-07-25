<script lang="ts">
  import { Chip, Description } from "@shizen-ui/svelte";
</script>

<div class="flex flex-col gap-6">
  <div class="flex flex-col gap-2">
    <Description>Default</Description>
    <div class="flex gap-2">
      <Chip color="default">Draft</Chip>
      <Chip color="default">Archived</Chip>
      <Chip color="default">Unknown</Chip>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <Description>Accent</Description>
    <div class="flex gap-2">
      <Chip color="accent">In Progress</Chip>
      <Chip color="accent">Syncing</Chip>
      <Chip color="accent">Scheduled</Chip>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <Description>Success</Description>
    <div class="flex gap-2">
      <Chip color="success">Active</Chip>
      <Chip color="success">Published</Chip>
      <Chip color="success">Verified</Chip>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <Description>Warning</Description>
    <div class="flex gap-2">
      <Chip color="warning">Pending</Chip>
      <Chip color="warning">Expiring Soon</Chip>
      <Chip color="warning">Needs Review</Chip>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <Description>Danger</Description>
    <div class="flex gap-2">
      <Chip color="danger">Deprecated</Chip>
      <Chip color="danger">Cancelled</Chip>
      <Chip color="danger">Failed</Chip>
    </div>
  </div>
</div>
