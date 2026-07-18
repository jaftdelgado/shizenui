<script lang="ts">
  import { Checkbox, CheckboxGroup, Label, Description } from "@shizen-ui/svelte";

  let enforcedPolicies = $state<string[]>(["mfa", "session"]);

  const securityLevels = [
    {
      id: "ip-lock",
      name: "IP Whitelisting",
      info: "Available on the Enterprise plan."
    },
    {
      id: "mfa",
      name: "Multi-factor authentication",
      info: "Required for all workspace members."
    },
    {
      id: "session",
      name: "Session Timeout",
      info: "Enforced after 30 minutes of inactivity."
    }
  ];
</script>

<div class="flex flex-col">
  <CheckboxGroup bind:value={enforcedPolicies} disabled>
    <Label>Security Settings</Label>
    <Description>Contact your admin to change these policies.</Description>

    <CheckboxGroup.Items>
      {#each securityLevels as policy}
        <Checkbox value={policy.id}>
          <Checkbox.Control />
          <Checkbox.Content>
            <Label>{policy.name}</Label>
            <Description>{policy.info}</Description>
          </Checkbox.Content>
        </Checkbox>
      {/each}
    </CheckboxGroup.Items>
  </CheckboxGroup>
</div>
