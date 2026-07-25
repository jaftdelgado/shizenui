<script lang="ts">
  import { Chip, Description } from "@shizen-ui/svelte";
</script>

<div class="flex flex-col gap-6">
  <div class="flex flex-col gap-2">
    <Description>Primary</Description>
    <div class="flex gap-2">
      <Chip variant="primary" color="default">Default</Chip>
      <Chip variant="primary" color="accent">Accent</Chip>
      <Chip variant="primary" color="success">Success</Chip>
      <Chip variant="primary" color="warning">Warning</Chip>
      <Chip variant="primary" color="danger">Danger</Chip>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <Description>Secondary</Description>
    <div class="flex gap-2">
      <Chip variant="secondary" color="default">Default</Chip>
      <Chip variant="secondary" color="accent">Accent</Chip>
      <Chip variant="secondary" color="success">Success</Chip>
      <Chip variant="secondary" color="warning">Warning</Chip>
      <Chip variant="secondary" color="danger">Danger</Chip>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <Description>Soft</Description>
    <div class="flex gap-2">
      <Chip variant="soft" color="default">Default</Chip>
      <Chip variant="soft" color="accent">Accent</Chip>
      <Chip variant="soft" color="success">Success</Chip>
      <Chip variant="soft" color="warning">Warning</Chip>
      <Chip variant="soft" color="danger">Danger</Chip>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <Description>Ghost</Description>
    <div class="flex gap-2">
      <Chip variant="ghost" color="default">Default</Chip>
      <Chip variant="ghost" color="accent">Accent</Chip>
      <Chip variant="ghost" color="success">Success</Chip>
      <Chip variant="ghost" color="warning">Warning</Chip>
      <Chip variant="ghost" color="danger">Danger</Chip>
    </div>
  </div>
</div>
