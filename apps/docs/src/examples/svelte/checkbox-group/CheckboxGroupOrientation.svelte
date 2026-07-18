<script lang="ts">
  import { Checkbox, CheckboxGroup, Label, Description } from "@shizen-ui/svelte";

  let selectedSections = $state<string[]>(["security", "billing"]);

  const digestSections = [
    {
      value: "product",
      label: "Product",
      description: "New features."
    },
    {
      value: "security",
      label: "Security",
      description: "Policy updates."
    },
    {
      value: "billing",
      label: "Billing",
      description: "Invoices and usage."
    }
  ];
</script>

<div class="flex w-full flex-col items-center">
  <CheckboxGroup orientation="horizontal" bind:value={selectedSections}>
    <Label>Weekly Digest</Label>
    <Description>Choose what to include.</Description>

    <CheckboxGroup.Items>
      {#each digestSections as section}
        <Checkbox value={section.value}>
          <Checkbox.Control />
          <Checkbox.Content>
            <Label>{section.label}</Label>
            <Description>{section.description}</Description>
          </Checkbox.Content>
        </Checkbox>
      {/each}
    </CheckboxGroup.Items>
  </CheckboxGroup>
</div>
