<script lang="ts">
  import { Switch, SwitchGroup, Label, Description, FieldError, Button } from "@shizen-ui/svelte";

  let paymentTools = $state<string[]>(["stripe"]);

  const tools = [
    { value: "stripe", label: "Stripe", description: "Process online card payments." },
    { value: "paypal", label: "PayPal", description: "Offer PayPal checkout." }
  ];

  function handleSubmit(event: SubmitEvent): void {
    event.preventDefault();

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const selectedTools = formData.getAll("paymentTools").join(", ") || "None";

    alert(`Payment tools saved:\n\n${selectedTools}`);
  }
</script>

<form class="flex flex-col gap-6" onsubmit={handleSubmit}>
  <SwitchGroup required name="paymentTools" bind:value={paymentTools}>
    <Label>Payment tools</Label>
    <Description>Select at least one payment provider.</Description>
    <FieldError>Select at least one payment provider.</FieldError>

    <SwitchGroup.Items>
      {#each tools as tool}
        <Switch value={tool.value}>
          <Switch.Control />
          <Switch.Content>
            <Label>{tool.label}</Label>
            <Description>{tool.description}</Description>
          </Switch.Content>
        </Switch>
      {/each}
    </SwitchGroup.Items>
  </SwitchGroup>

  <div class="flex gap-2">
    <Button type="reset" variant="outline" size="sm">Reset</Button>
    <Button type="submit" size="sm">Save tools</Button>
  </div>
</form>
