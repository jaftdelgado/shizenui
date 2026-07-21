<script lang="ts">
  import { Checkbox, CheckboxGroup, Label, Description } from "@shizen-ui/svelte";
</script>

<CheckboxGroup>
  <Label />
  <Description />
  <CheckboxGroup.Items>
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
  </CheckboxGroup.Items>
  <FieldError />
</CheckboxGroup>
