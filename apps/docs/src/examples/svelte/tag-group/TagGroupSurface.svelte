<script lang="ts">
  import { Tag, TagGroup, Label, Description, Surface } from "@shizen-ui/svelte";

  let emailTopics = $state<string[]>(["orders", "promotions", "newsletter"]);

  const topics = [
    { value: "orders", label: "Orders" },
    { value: "promotions", label: "Promotions" },
    { value: "product-updates", label: "Product Updates" },
    { value: "events", label: "Events" },
    { value: "surveys", label: "Surveys" },
    { value: "newsletter", label: "Newsletter" }
  ];
</script>

<div class="flex w-full max-w-82 flex-col">
  <Surface>
    <TagGroup selectionMode="multiple" bind:value={emailTopics}>
      <Label>Email me about</Label>
      <TagGroup.List>
        {#each topics as topic (topic.value)}
          <Tag value={topic.value}>{topic.label}</Tag>
        {/each}
      </TagGroup.List>
      <Description>Choose which emails you want to receive.</Description>
    </TagGroup>
  </Surface>
</div>
