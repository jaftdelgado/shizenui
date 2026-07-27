<script lang="ts">
  import { Input, Label } from "@shizen-ui/svelte";
</script>

<div class="w-full max-w-64 flex-col gap-2">
  <Label for="billing-email" disabled>Email Address</Label>
  <Input id="billing-email" value="dev@shizenui.com" disabled />
</div>
