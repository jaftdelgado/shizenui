<script lang="ts">
  import { Tag, TagGroup, Label, Description, FieldError } from "@shizen-ui/svelte";
</script>

<TagGroup>
  <Label />
  <TagGroup.List>
    <Tag value="laundry">
      Laundry
      <Tag.RemoveButton />
    </Tag>
  </TagGroup.List>
  <Description />
  <FieldError />
</TagGroup>
