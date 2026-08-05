<script lang="ts">
  import { Checkbox, Label, Description } from "@shizen-ui/svelte";
</script>

<div class="grid w-full max-w-64 gap-6">
  <div class="flex flex-col gap-2">
    <Description>Default</Description>
    <Checkbox variant="default">
      <Checkbox.Control />
      <Checkbox.Content>
        <Label>Default</Label>
        <Description>Standard checkbox style.</Description>
      </Checkbox.Content>
    </Checkbox>

    <Checkbox variant="default" checked>
      <Checkbox.Control />
      <Checkbox.Content>
        <Label>Default checked</Label>
        <Description>Marked as selected.</Description>
      </Checkbox.Content>
    </Checkbox>
  </div>

  <div class="flex flex-col gap-2">
    <Description>Secondary</Description>
    <Checkbox variant="secondary">
      <Checkbox.Control />
      <Checkbox.Content>
        <Label>Secondary</Label>
        <Description>Alternate, lower-emphasis style.</Description>
      </Checkbox.Content>
    </Checkbox>

    <Checkbox variant="secondary" checked>
      <Checkbox.Control />
      <Checkbox.Content>
        <Label>Secondary checked</Label>
        <Description>Selected with secondary variant.</Description>
      </Checkbox.Content>
    </Checkbox>
  </div>
</div>
