<script lang="ts">
  import { RadioGroup, Radio, Label, Description } from "@shizen-ui/svelte";

  let memberRole = $state("editor");
  let previousRole = $state("editor");

  const roles = [
    {
      value: "viewer",
      label: "Viewer",
      description: "Can view but not edit content."
    },
    {
      value: "editor",
      label: "Editor",
      description: "Can view and edit content."
    },
    {
      value: "owner",
      label: "Owner",
      description: "Full access, including billing."
    }
  ];

  function getRole() {
    return memberRole;
  }

  function setRole(newRole: string) {
    if (newRole === "owner" && !confirm("Transfer ownership to this member?")) {
      return;
    }

    previousRole = memberRole;
    memberRole = newRole;
  }
</script>

<RadioGroup bind:value={getRole, setRole}>
  <Label>Member Role</Label>
  <Description>Choose the access level for this team member.</Description>
  <RadioGroup.Items>
    {#each roles as role}
      <Radio value={role.value}>
        <Radio.Control />
        <Radio.Content>
          <Label>{role.label}</Label>
          <Description>{role.description}</Description>
        </Radio.Content>
      </Radio>
    {/each}
  </RadioGroup.Items>
</RadioGroup>
