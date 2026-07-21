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

  const eventOptions = [
    { value: "push", label: "Push" },
    { value: "pull_request", label: "Pull request" },
    { value: "release", label: "Release" },
    { value: "issues", label: "Issues" }
  ];

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
      {#each eventOptions as option}
        <Checkbox value={option.value}>
          <Checkbox.Control />
          <Checkbox.Content>
            <Label>{option.label}</Label>
          </Checkbox.Content>
        </Checkbox>
      {/each}
    </CheckboxGroup.Items>
  </CheckboxGroup>

  <div class="flex gap-2">
    <Button type="reset" variant="outline" size="sm">Reset</Button>
    <Button type="submit" size="sm">Save webhook</Button>
  </div>
</form>
