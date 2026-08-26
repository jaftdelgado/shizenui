<script lang="ts">
  import { Alert } from "@shizen-ui/svelte";
  import Icon from "@components/svelte/Icon.svelte";
  import { InformationCircleIcon } from "@hugeicons/core-free-icons";
</script>

<Alert status="accent" class="w-full max-w-xl">
  <Alert.Indicator>
    {#snippet children()}
      <Icon icon={InformationCircleIcon} />
    {/snippet}
  </Alert.Indicator>
  <Alert.Content>
    <Alert.Title>Figma file is ready to review</Alert.Title>
    <Alert.Description>
      Your team can now review the latest onboarding flow and leave comments in Figma.
    </Alert.Description>
  </Alert.Content>
</Alert>
