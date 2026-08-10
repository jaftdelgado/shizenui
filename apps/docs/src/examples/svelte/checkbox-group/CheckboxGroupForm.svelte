<script lang="ts">
  import {
    Checkbox,
    CheckboxGroup,
    Label,
    Description,
    FieldError,
    Button
  } from "@shizen-ui/svelte";

  let events = $state<string[]>(["push"]);

  const eventOptions = [
    { value: "push", label: "Push" },
    { value: "pull_request", label: "Pull request" },
    { value: "release", label: "Release" },
    { value: "issues", label: "Issues" }
  ];

  function handleSubmit(event: SubmitEvent): void {
    event.preventDefault();

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const selectedEvents = formData.getAll("events").join(", ") || "None";

    alert(`Webhook saved!\n\nEvents: ${selectedEvents}`);
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
