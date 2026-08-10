<script>
  import { Switch, Label, Description } from "@shizen-ui/svelte";
  import Icon from "@components/svelte/Icon.svelte";
  import { PowerIcon, PowerOffIcon } from "@hugeicons/core-free-icons";

  let checked = false;
</script>

<div class="flex flex-col gap-4">
  <Switch bind:checked>
    <Switch.Control>
      <Switch.Thumb>
        <Icon
          icon={checked ? PowerIcon : PowerOffIcon}
          size={12}
          strokeWidth={2.5}
          class={checked ? "text-accent" : "text-control-text"}
        />
      </Switch.Thumb>
    </Switch.Control>
    <Switch.Content>
      <Label>Database connection</Label>
      <Description>Stay connected to the SQL database.</Description>
    </Switch.Content>
  </Switch>
</div>
