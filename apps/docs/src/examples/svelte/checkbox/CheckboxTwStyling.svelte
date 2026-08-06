<script lang="ts">
  import { Checkbox, Label } from "@shizen-ui/svelte";

  const options = [
    { id: "typescript", label: "TypeScript", checked: true },
    { id: "swift", label: "Swift", checked: true },
    { id: "python", label: "Python", checked: false },
    { id: "Rust", label: "Rust", checked: false }
  ];

  let items = $state(options);
</script>

<div class="flex flex-col gap-5">
  {#each items as item (item.id)}
    <Checkbox bind:checked={item.checked} class="gap-4">
      <Checkbox.Control class="rounded-sm bg-zinc-200 hover:bg-zinc-300 data-checked:bg-purple-600"
      ></Checkbox.Control>
      <Checkbox.Content>
        <Label>{item.label}</Label>
      </Checkbox.Content>
    </Checkbox>
  {/each}
</div>
