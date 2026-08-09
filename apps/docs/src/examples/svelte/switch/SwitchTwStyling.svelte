<script lang="ts">
  import { Switch, SwitchGroup, Label, Description } from "@shizen-ui/svelte";

  const permissions = [
    { id: "public_profile", label: "Public profile", description: "Anyone can view your profile." },
    {
      id: "search_indexing",
      label: "Search indexing",
      description: "Allow search engines to index you."
    }
  ];
</script>

<div class="flex flex-col gap-6">
  <SwitchGroup value={["public_profile"]}>
    <Label>Privacy</Label>
    <Description>Control who can find and see your account.</Description>

    <SwitchGroup.Items>
      {#each permissions as item}
        <Switch
          value={item.id}
          class="
            [--switch-padding:0.125rem]
            [--switch-thumb-ratio:1]
            [--switch-width:2.125rem]
            data-checked:[--switch-bg-hover:var(--color-success)]
            data-checked:[--switch-bg:var(--color-success)]
          "
        >
          <Switch.Control />
          <Switch.Content>
            <Label>{item.label}</Label>
            <Description>{item.description}</Description>
          </Switch.Content>
        </Switch>
      {/each}
    </SwitchGroup.Items>
  </SwitchGroup>
</div>
