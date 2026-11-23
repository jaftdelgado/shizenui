<script lang="ts">
  import { Tag, TagGroup, Label, Description } from "@shizen-ui/svelte";
  import Icon from "@components/svelte/Icon.svelte";
  import {
    Wifi01Icon,
    SnowIcon,
    ChefHatIcon,
    WashingMachineIcon,
    Tv01Icon,
    PoolIcon,
    CircleParkingIcon,
    Dumbbell01Icon
  } from "@hugeicons/core-free-icons";

  let selected = $state(["wifi", "kitchen"]);

  const amenities = [
    { value: "wifi", label: "Wifi", icon: Wifi01Icon },
    { value: "air-conditioning", label: "Air conditioning", icon: SnowIcon },
    { value: "kitchen", label: "Kitchen", icon: ChefHatIcon },
    { value: "washer", label: "Washer", icon: WashingMachineIcon },
    { value: "tv", label: "TV", icon: Tv01Icon },
    { value: "pool", label: "Pool", icon: PoolIcon },
    { value: "parking", label: "Free parking", icon: CircleParkingIcon },
    { value: "gym", label: "Gym", icon: Dumbbell01Icon }
  ];
</script>

<div class="grid w-full max-w-sm">
  <TagGroup selectionMode="multiple" bind:value={selected}>
    <Label>Amenities</Label>
    <TagGroup.List>
      {#each amenities as amenity (amenity.value)}
        <Tag value={amenity.value}>
          {#snippet startContent()}
            <Icon icon={amenity.icon} size={14} />
          {/snippet}
          {amenity.label}
        </Tag>
      {/each}
    </TagGroup.List>
    <Description>Select the amenities you want in your stay.</Description>
  </TagGroup>
</div>
