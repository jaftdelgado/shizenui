<script lang="ts">
  import { Checkbox, Description, Label, Surface } from "@shizen-ui/svelte";

  let allowComments = $state(true);
  let featurePost = $state(false);
</script>

<div class="flex w-full max-w-72 flex-col">
  <Surface class="flex flex-col gap-2">
    <Checkbox bind:checked={allowComments}>
      <Checkbox.Control />
      <Checkbox.Content>
        <Label>Allow comments</Label>
        <Description>Let readers comment on this post.</Description>
      </Checkbox.Content>
    </Checkbox>

    <Checkbox bind:checked={featurePost}>
      <Checkbox.Control />
      <Checkbox.Content>
        <Label>Feature post</Label>
        <Description>Pin this post to the homepage.</Description>
      </Checkbox.Content>
    </Checkbox>
  </Surface>
</div>
