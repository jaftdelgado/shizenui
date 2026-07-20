<script lang="ts">
  import {
    Checkbox,
    CheckboxGroup,
    Label,
    Description,
    FieldError,
    Button
  } from "@shizen-ui/svelte";

  let events = $state<string[]>([]);

  function handleSubmit(event: SubmitEvent): void {
    event.preventDefault();
    alert(`Webhook saved!\n\nEvents: ${events.length > 0 ? events.join(", ") : "None"}`);
  }
</script>

<form class="flex w-full max-w-72 flex-col gap-6" onsubmit={handleSubmit}>
  <CheckboxGroup required bind:value={events} name="events">
    <Label>Trigger events</Label>
    <Description>Choose which repository events send a payload.</Description>
    <FieldError>Select at least one event.</FieldError>
    <CheckboxGroup.Items>
      <Checkbox value="push">
        <Checkbox.Control />
        <Checkbox.Content>
          <Label>Push</Label>
        </Checkbox.Content>
      </Checkbox>

      <Checkbox value="pull_request">
        <Checkbox.Control />
        <Checkbox.Content>
          <Label>Pull request</Label>
        </Checkbox.Content>
      </Checkbox>

      <Checkbox value="release">
        <Checkbox.Control />
        <Checkbox.Content>
          <Label>Release</Label>
        </Checkbox.Content>
      </Checkbox>

      <Checkbox value="issues">
        <Checkbox.Control />
        <Checkbox.Content>
          <Label>Issues</Label>
        </Checkbox.Content>
      </Checkbox>
    </CheckboxGroup.Items>
  </CheckboxGroup>

  <div class="flex gap-2">
    <Button type="reset" variant="outline" size="sm">Reset</Button>
    <Button type="submit" size="sm">Save webhook</Button>
  </div>
</form>
