<script lang="ts">
  import { Tag, TagGroup, Label, Description } from "@shizen-ui/svelte";

  import Icon from "@components/svelte/Icon.svelte";
  import { Mail01Icon, Link01Icon, Message01Icon } from "@hugeicons/core-free-icons";

  const shareOptions = [
    { value: "email", label: "Email", icon: Mail01Icon },
    { value: "link", label: "Link", icon: Link01Icon },
    { value: "message", label: "Message", icon: Message01Icon }
  ];

  const statuses = [
    { value: "open", label: "Open", count: 24 },
    { value: "in-progress", label: "In progress", count: 8 },
    { value: "closed", label: "Closed", count: 112 }
  ];

  let selectedShare = $state<string[]>(["email"]);
  let selectedStatuses = $state<string[]>(["open", "in-progress"]);
</script>

<div class="flex flex-col gap-6">
  <TagGroup selectionMode="multiple" bind:value={selectedShare}>
    <Label>Share document via</Label>
    <TagGroup.List>
      {#each shareOptions as option (option.value)}
        <Tag value={option.value}>
          {#snippet startContent()}
            <Icon icon={option.icon} size={14} />
          {/snippet}
          {option.label}
        </Tag>
      {/each}
    </TagGroup.List>
    <Description>Pick how you want to send this document.</Description>
  </TagGroup>

  <TagGroup selectionMode="multiple" bind:value={selectedStatuses}>
    <Label>Filter issues by status</Label>
    <TagGroup.List>
      {#each statuses as status (status.value)}
        <Tag value={status.value}>
          {status.label}
          {#snippet endContent()}
            <span class="pl-1 text-xs tabular-nums opacity-70">{status.count}</span>
          {/snippet}
        </Tag>
      {/each}
    </TagGroup.List>
    <Description>The number shows how many issues match each status.</Description>
  </TagGroup>
</div>
