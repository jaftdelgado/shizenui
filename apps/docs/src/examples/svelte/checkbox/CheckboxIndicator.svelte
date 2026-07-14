<script lang="ts">
  import { Checkbox, Label, Description } from "@shizen-ui/svelte";

  import Icon from "@components/svelte/Icon.svelte";
  import { PlusSignIcon } from "@hugeicons/core-free-icons";

  const interests = [
    {
      id: "3d-motion",
      label: "3D & Motion",
      checked: false
    },
    {
      id: "product-management",
      label: "Product Management",
      checked: false
    },
    {
      id: "ui-ux-design",
      label: "UI/UX Design",
      checked: true
    },
    {
      id: "frontend-dev",
      label: "Frontend Development",
      checked: true
    }
  ];

  let items = $state(interests);
</script>

<div class="flex flex-col gap-4">
  {#each items as item (item.id)}
    <Checkbox bind:checked={item.checked}>
      <Checkbox.Control>
        <Checkbox.Indicator>
          <Icon icon={PlusSignIcon} class="size-3" strokeWidth={2} />
        </Checkbox.Indicator>
      </Checkbox.Control>
      <Checkbox.Content>
        <Label>{item.label}</Label>
      </Checkbox.Content>
    </Checkbox>
  {/each}
</div>
