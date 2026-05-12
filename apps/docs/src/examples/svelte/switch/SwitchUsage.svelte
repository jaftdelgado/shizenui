<script>
  import { Switch } from "@shizen-ui/svelte";

  let selected = true;
</script>

<div class="flex flex-col">
  <Switch bind:checked={selected} aria-label="Airplane Mode">
    <Switch.Control />
  </Switch>
</div>
