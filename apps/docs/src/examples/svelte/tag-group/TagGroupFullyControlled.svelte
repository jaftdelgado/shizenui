<script lang="ts">
  import { Tag, TagGroup, Label, Description } from "@shizen-ui/svelte";

  import Icon from "@components/svelte/Icon.svelte";
  import {
    CheckmarkCircle02Icon,
    VegetarianFoodIcon,
    Leaf01Icon,
    WheatIcon,
    MilkBottleIcon,
    NutIcon
  } from "@hugeicons/core-free-icons";

  const NONE = "No restrictions";

  const diets = [
    { value: NONE, icon: CheckmarkCircle02Icon },
    { value: "Vegetarian", icon: VegetarianFoodIcon },
    { value: "Vegan", icon: Leaf01Icon },
    { value: "Gluten-free", icon: WheatIcon },
    { value: "Dairy-free", icon: MilkBottleIcon },
    { value: "Nut-free", icon: NutIcon }
  ];

  let selectedDiets = $state([NONE]);

  function getDiets() {
    return selectedDiets;
  }

  function setDiets(newDiets: string[]) {
    const justSelectedNone = newDiets.includes(NONE) && !selectedDiets.includes(NONE);

    if (justSelectedNone) {
      selectedDiets = [NONE];
      return;
    }

    selectedDiets = newDiets.filter((diet) => diet !== NONE || newDiets.length === 1);
  }
</script>

<div class="grid w-full max-w-xs">
  <TagGroup selectionMode="multiple" bind:value={getDiets, setDiets}>
    <Label>Dietary preferences</Label>
    <TagGroup.List>
      {#each diets as diet (diet.value)}
        <Tag value={diet.value}>
          {#snippet startContent()}
            <Icon icon={diet.icon} size={14} />
          {/snippet}
          {diet.value}
        </Tag>
      {/each}
    </TagGroup.List>
    <Description>"No restrictions" can't be combined with other preferences.</Description>
  </TagGroup>
</div>
