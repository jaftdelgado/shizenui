<script lang="ts">
  import { Alert, Button } from "@shizen-ui/svelte";
  import Icon from "@components/svelte/Icon.svelte";
  import { CheckmarkBadge02Icon } from "@hugeicons/core-free-icons";
</script>

<div class="grid w-full max-w-xs">
  <Alert
    status="accent"
    class="rounded-2xl border border-purple-200 bg-linear-to-br from-purple-50 to-purple-100 [--alert-indicator-color:var(--color-purple-800)] [--alert-title-fg:var(--color-purple-800)]"
  >
    <Alert.Indicator>
      <Icon icon={CheckmarkBadge02Icon} class="size-5" />
    </Alert.Indicator>
    <Alert.Content>
      <Alert.Title>Unlock unlimited projects</Alert.Title>
      <Alert.Description>
        Upgrade to Pro for unlimited projects and priority support.
      </Alert.Description>
    </Alert.Content>
    <Alert.Actions class="pt-2">
      <Button size="sm" class="rounded-lg bg-purple-600 hover:bg-purple-700">Upgrade to Pro</Button>
    </Alert.Actions>
  </Alert>
</div>
