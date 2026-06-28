<script lang="ts">
  import { Toggle, Description } from "@shizen-ui/svelte";

  import Icon from "@components/svelte/Icon.svelte";
  import { UserCheck01Icon, UserAdd01Icon } from "@hugeicons/core-free-icons";

  let isFollowing = $state(false);
</script>

<div class="flex flex-col items-center gap-4">
  <Toggle bind:pressed={isFollowing}>
    {#snippet startContent()}
      <Icon icon={isFollowing ? UserCheck01Icon : UserAdd01Icon} />
    {/snippet}
    {isFollowing ? "Following" : "Follow"}
  </Toggle>
  <Description>
    Toggle pressed: {isFollowing}
  </Description>
</div>
