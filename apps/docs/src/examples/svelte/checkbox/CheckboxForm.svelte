<script lang="ts">
  import { Checkbox, Label, Button } from "@shizen-ui/svelte";

  let notifications = $state(false);
  let newsletter = $state(false);
  let acceptTerms = $state(false);

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    alert(
      `Preferences saved successfully!\n\n` +
        `Email notifications: ${notifications ? "Yes" : "No"}\n` +
        `Newsletter: ${newsletter ? "Yes" : "No"}\n` +
        `Terms accepted: ${acceptTerms ? "Yes" : "No"}`
    );
  }
</script>

<form class="flex max-w-xs flex-col gap-6" onsubmit={handleSubmit}>
  <div class="flex flex-col gap-4">
    <Checkbox bind:checked={notifications} name="notifications">
      <Checkbox.Control />
      <Checkbox.Content>
        <Label>Email notifications</Label>
      </Checkbox.Content>
    </Checkbox>

    <Checkbox bind:checked={newsletter} name="newsletter">
      <Checkbox.Control />
      <Checkbox.Content>
        <Label>Subscribe to our newsletter</Label>
      </Checkbox.Content>
    </Checkbox>

    <Checkbox bind:checked={acceptTerms} name="acceptTerms" required>
      <Checkbox.Control />
      <Checkbox.Content>
        <Label>I agree to the Terms of Service</Label>
      </Checkbox.Content>
    </Checkbox>
  </div>

  <div class="flex gap-2">
    <Button type="reset" variant="outline" size="sm">Reset</Button>
    <Button type="submit" size="sm">Save preferences</Button>
  </div>
</form>
