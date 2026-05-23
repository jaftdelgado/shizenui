<script lang="ts">
  import { Switch, Label, Description } from "@shizen-ui/svelte";

  let v1 = $state(false);
  let v2 = $state(false);
  let v3 = $state(false);
  let v4 = $state(true);
  let v5 = $state(false);
  let v6 = $state(false);
  let v7 = $state(false);
  let v8 = $state(false);
  let v9 = $state(false);
  let keyLog = $state<string[]>([]);
</script>

<div class="flex flex-col gap-8 p-8">
  <!-- ================================================================ -->
  <!-- PATRÓN 9 — onKeyDown expuesto al consumidor                      -->
  <!-- Esperado: un solo log por keypress en el array de abajo          -->
  <!-- Espacio y Enter togglean el switch Y disparan el callback        -->
  <!-- Otras teclas solo disparan el callback sin togglear              -->
  <!-- Verificar que NO aparece la misma tecla dos veces por evento     -->
  <!-- ================================================================ -->
  <section>
    <p class="mb-2 font-mono text-sm text-gray-500">Patrón 9 — onKeyDown sin duplicados</p>
    <Switch
      bind:checked={v9}
      onKeyDown={(e: KeyboardEvent) =>
        (keyLog = [`${e.key} (${new Date().toISOString()})`, ...keyLog].slice(0, 5))}
    >
      <Switch.Control />
      <Switch.Content>
        <Label>Notifications</Label>
      </Switch.Content>
    </Switch>
    {#if keyLog.length > 0}
      <ul class="mt-2 font-mono text-xs text-gray-400">
        {#each keyLog as entry}
          <li>{entry}</li>
        {/each}
      </ul>
    {/if}
  </section>
</div>
