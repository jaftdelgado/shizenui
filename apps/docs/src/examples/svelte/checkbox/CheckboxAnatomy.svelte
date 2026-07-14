<script lang="ts">
  import { Checkbox, Label, Description } from "@shizen-ui/svelte";
</script>

<Checkbox>
  <Checkbox.Control>
    <Checkbox.Indicator>
      <!-- Custom indicator (optional) -->
    </Checkbox.Indicator>
  </Checkbox.Control>
  <Checkbox.Content>
    <Label />
    <Description />
  </Checkbox.Content>
</Checkbox>
