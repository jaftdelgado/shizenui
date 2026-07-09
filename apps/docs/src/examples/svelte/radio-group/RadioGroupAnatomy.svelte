<script lang="ts">
  import { RadioGroup, Radio, Label, Description, FieldError } from "@shizen-ui/svelte";
</script>

<RadioGroup>
  <Label />
  <Description />

  <RadioGroup.Items>
    <Radio value="option1">
      <Radio.Control>
        <Radio.Indicator />
      </Radio.Control>
      <Radio.Content>
        <Label />
        <Description />
      </Radio.Content>
    </Radio>
  </RadioGroup.Items>

  <FieldError />
</RadioGroup>
