<script lang="ts">
  import { Surface, Input, InputGroup, Label, Description } from "@shizen-ui/svelte";
  import Icon from "@components/svelte/Icon.svelte";
  import { Call02Icon } from "@hugeicons/core-free-icons";

  let fullName = $state("");
  let phone = $state("");
</script>

<div class="grid w-full max-w-72">
  <Surface class="flex flex-col gap-4 p-4">
    <div class="flex flex-col gap-2">
      <Label for="full-name">Full name</Label>
      <Input
        id="full-name"
        bind:value={fullName}
        placeholder="Enter your full name"
        aria-describedby="full-name-description"
      />
      <Description id="full-name-description">As it appears on your shipping label.</Description>
    </div>

    <div class="flex flex-col gap-2">
      <Label for="phone">Phone number</Label>
      <InputGroup>
        <InputGroup.Prefix>
          <Icon icon={Call02Icon} />
        </InputGroup.Prefix>
        <InputGroup.Input
          id="phone"
          type="tel"
          bind:value={phone}
          placeholder="Enter your phone number"
          aria-describedby="phone-description"
        />
      </InputGroup>
      <Description id="phone-description">We'll only use this for delivery updates.</Description>
    </div>
  </Surface>
</div>
