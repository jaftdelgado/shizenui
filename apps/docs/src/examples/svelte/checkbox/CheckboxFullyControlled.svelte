<script lang="ts">
  import { Checkbox, Label, Description } from "@shizen-ui/svelte";

  let acceptedTerms = $state(false);
  let acceptedAt = $state<string | null>(null);

  function getChecked() {
    return acceptedTerms;
  }

  function setChecked(newChecked: boolean) {
    if (!newChecked && acceptedTerms) {
      const confirmed = confirm("Are you sure you want to withdraw your consent?");
      if (!confirmed) return;
    }

    acceptedTerms = newChecked;
    acceptedAt = newChecked ? new Date().toLocaleString() : null;
  }
</script>

<div class="flex flex-col">
  <Checkbox bind:checked={getChecked, setChecked}>
    <Checkbox.Control />
    <Checkbox.Content>
      <Label>I agree to the Terms of Service</Label>
      <Description>
        {acceptedAt ? `Accepted on ${acceptedAt}` : "Required to create your account."}
      </Description>
    </Checkbox.Content>
  </Checkbox>
</div>
