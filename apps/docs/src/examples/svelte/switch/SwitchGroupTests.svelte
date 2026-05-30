<script lang="ts">
  import { Switch, Label, Description } from "@shizen-ui/svelte";

  // ================================================================
  // Estado compartido
  // ================================================================
  let checked1 = $state(false);
  let checked2 = $state(false);
  let checked3 = $state(false);

  let showLabel = $state(true);
  let showDescription = $state(true);
  let showContent = $state(true);
</script>

<div class="flex flex-col gap-12 p-8">
  <!-- ================================================================ -->
  <!-- CASO 3 — Switch.Content montado/desmontado condicionalmente      -->
  <!-- Verificar:                                                        -->
  <!--   - Con Content: aria-labelledby presente                       -->
  <!--   - Sin Content: aria-labelledby ausente, warning en consola    -->
  <!--   - Al remontar Content: aria-labelledby vuelve a aparecer      -->
  <!--   - hasContent vuelve a false cuando Content desmonta            -->
  <!-- ================================================================ -->
  <section class="flex flex-col gap-4">
    <p class="font-mono text-sm text-gray-500">Caso 3 — Switch.Content condicional</p>

    <label class="flex items-center gap-2 text-sm">
      <input type="checkbox" bind:checked={showContent} />
      Mostrar Switch.Content
    </label>

    <Switch bind:checked={checked3}>
      <Switch.Control />
      {#if showContent}
        <Switch.Content>
          Push notifications
          <Description>Receive alerts directly in your browser.</Description>
        </Switch.Content>
      {/if}
    </Switch>

    <Switch bind:checked={checked2}>
      <Switch.Control />
      {#if showContent}
        <Switch.Content>
          <Description>Receive alerts directly in your browser.</Description>
          <Label>Push notifications</Label>
        </Switch.Content>
      {/if}
    </Switch>

    <p class="font-mono text-xs text-gray-400">
      Esperado con Content: aria-labelledby y aria-describedby presentes<br />
      Esperado sin Content: ambos ausentes, warning "No Switch.Content found"<br />
      Al remontar: aria attrs vuelven a aparecer correctamente
    </p>
  </section>
</div>
