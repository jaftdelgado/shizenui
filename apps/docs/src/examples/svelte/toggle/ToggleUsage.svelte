<script lang="ts">
  import { Toggle } from "@shizen-ui/svelte";
  import Icon from "@components/svelte/Icon.svelte";
  import {
    Bookmark01Icon,
    StarIcon,
    ThumbsUpIcon,
    Notification01Icon,
    WifiIcon,
    BluetoothIcon,
    BatteryEcoChargingIcon
  } from "@hugeicons/core-free-icons";

  let bookmarked = $state(true);
  let starred = $state(false);
  let liked = $state(false);
  let notified = $state(true);
  let wifi = $state(true);
  let bluetooth = $state(false);
  let battery = $state(false);
</script>

<div class="flex max-w-lg flex-wrap items-center gap-3">
  <Toggle bind:pressed={bookmarked} variant="default">
    {#snippet startContent()}
      <Icon icon={Bookmark01Icon} />
    {/snippet}
    Bookmark
  </Toggle>

  <Toggle bind:pressed={starred} variant="default">
    {#snippet startContent()}
      <Icon icon={StarIcon} />
    {/snippet}
    Favorite
  </Toggle>

  <Toggle bind:pressed={liked} variant="outline">
    {#snippet startContent()}
      <Icon icon={ThumbsUpIcon} />
    {/snippet}
    Like
  </Toggle>

  <Toggle bind:pressed={notified} variant="outline">
    {#snippet startContent()}
      <Icon icon={Notification01Icon} />
    {/snippet}
    Notify me
  </Toggle>

  <Toggle bind:pressed={wifi} variant="ghost">
    {#snippet startContent()}
      <Icon icon={WifiIcon} />
    {/snippet}
    Wi-Fi
  </Toggle>

  <Toggle bind:pressed={bluetooth} variant="ghost">
    {#snippet startContent()}
      <Icon icon={BluetoothIcon} />
    {/snippet}
    Bluetooth
  </Toggle>

  <Toggle bind:pressed={battery} variant="ghost">
    {#snippet startContent()}
      <Icon icon={BatteryEcoChargingIcon} />
    {/snippet}
    Battery Saver
  </Toggle>
</div>
