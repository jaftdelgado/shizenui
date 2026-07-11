<script lang="ts">
  import { RadioGroup, Radio, Label, Description } from "@shizen-ui/svelte";

  type Item = { id: string; label: string };

  // Estado inicial: A, B, C, D en orden "natural"
  let items = $state<Item[]>([
    { id: "a", label: "Opción A" },
    { id: "b", label: "Opción B" },
    { id: "c", label: "Opción C" },
    { id: "d", label: "Opción D" }
  ]);

  let selected = $state<string | undefined>(undefined);

  // Log de teclas para ver a qué id salta el foco realmente
  let log: string[] = $state([]);

  function pushLog(msg: string) {
    log = [msg, ...log].slice(0, 8);
  }

  // --- Acciones para reproducir el edge case ---

  // 1. Insertar un nuevo ítem AL INICIO (no al final)
  //    Si el registro fue por orden de montaje, el nuevo item
  //    quedará al final de #itemIds aunque visualmente esté primero.
  function insertAtStart() {
    const id = `x-${crypto.randomUUID().slice(0, 4)}`;
    items = [{ id, label: `Nuevo (${id})` }, ...items];
    pushLog(`Insertado "${id}" al INICIO visual`);
  }

  // 2. Invertir el orden visual del arreglo por completo
  function reverseOrder() {
    items = [...items].reverse();
    pushLog("Orden visual INVERTIDO");
  }

  // 3. Mezclar aleatoriamente (simula reorder por drag&drop, filtros, etc.)
  function shuffle() {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    items = copy;
    pushLog("Orden MEZCLADO aleatoriamente");
  }

  function reset() {
    items = [
      { id: "a", label: "Opción A" },
      { id: "b", label: "Opción B" },
      { id: "c", label: "Opción C" },
      { id: "d", label: "Opción D" }
    ];
    selected = undefined;
    pushLog("Reset al orden original");
  }
</script>

<div style="max-width: 32rem; margin: 2rem auto; font-family: sans-serif;">
  <h2>Repro F6 — orden de registro vs. orden visual</h2>
  <p style="color: #666; font-size: 0.9rem;">
    1) Selecciona un ítem con click. 2) Reordena con los botones. 3) Usa las flechas del teclado con
    foco en el grupo y observa el log: ¿el foco salta según el orden
    <strong>visual actual</strong> (esperado) o según el orden en que cada ítem se
    <strong>montó por primera vez</strong> (bug)?
  </p>

  <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
    <button onclick={insertAtStart}>Insertar al inicio</button>
    <button onclick={reverseOrder}>Invertir orden</button>
    <button onclick={shuffle}>Mezclar</button>
    <button onclick={reset}>Reset</button>
  </div>

  <!--
    IMPORTANTE: el listener de log va en este wrapper EXTERNO, en fase de
    captura (capture: true) vía onkeydowncapture. NO se le pasa ningún
    onkeydown a <RadioGroup.Items> directamente: eso pisaría el handler
    interno de la librería (colisión encontrada — ver nota en el chat).
    Aquí solo observamos, nunca interceptamos ni hacemos preventDefault.
  -->
  <div
    onkeydowncapture={(e: KeyboardEvent) => {
      if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key))
        return;
      // Se loguea DESPUÉS de que el handler interno del grupo ya movió el foco
      requestAnimationFrame(() => {
        const active = document.activeElement as HTMLElement | null;
        pushLog(`Tecla ${e.key} → foco en: ${active?.textContent?.trim() ?? "?"}`);
      });
    }}
  >
    <RadioGroup bind:value={selected} name="repro-f6">
      <Label>Ítems (orden visual actual, de arriba a abajo)</Label>
      <Description>Reordena arriba y navega con flechas para comparar.</Description>

      <RadioGroup.Items>
        {#each items as item (item.id)}
          <Radio value={item.id}>
            <Radio.Control />
            <Radio.Content>
              <Label>{item.label}</Label>
            </Radio.Content>
          </Radio>
        {/each}
      </RadioGroup.Items>
    </RadioGroup>
  </div>

  <h3 style="margin-top: 1.5rem;">Log</h3>
  <ul style="font-family: monospace; font-size: 0.85rem;">
    {#each log as entry}
      <li>{entry}</li>
    {/each}
  </ul>
</div>
