<script lang="ts">
  import { Surface, Button, Label, Description } from "@shizen-ui/svelte";
</script>

<Surface
  class="flex w-full max-w-72 flex-col gap-2 rounded-md border-l-4 border-l-violet-500 bg-violet-100 p-3 shadow-none"
>
  <div class="flex flex-col">
    <Label>Invite pending</Label>
    <Description>maria@example.com hasn't accepted your invite yet.</Description>
  </div>
  <Button size="sm" class="self-start rounded-md bg-violet-600">Resend invite</Button>
</Surface>
