<script lang="ts">
  import { Switch, Label, Description, Button } from "@shizen-ui/svelte";

  let conversationView = $state(false);
  let smartCompose = $state(true);

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const values = Object.fromEntries(formData);

    const summary = Object.entries(values)
      .map(([key, value]) => `${key}: ${value === "on" ? "enabled" : "disabled"}`)
      .join("\n");

    alert(`Settings saved:\n\n${summary}`);
    console.log(values);
  }
</script>

<form class="flex flex-col gap-6" onsubmit={handleSubmit}>
  <div class="flex flex-col gap-3">
    <Switch name="conversationView" bind:checked={conversationView}>
      <Switch.Control />
      <Switch.Content>
        <Label>Conversation view</Label>
        <Description>Group emails from the same thread together</Description>
      </Switch.Content>
    </Switch>

    <Switch name="smartCompose" bind:checked={smartCompose}>
      <Switch.Control />
      <Switch.Content>
        <Label>Smart compose</Label>
        <Description>Show writing suggestions as you type</Description>
      </Switch.Content>
    </Switch>
  </div>

  <div class="flex gap-2">
    <Button type="reset" variant="outline" size="sm">Reset</Button>
    <Button type="submit" size="sm">Save settings</Button>
  </div>
</form>
