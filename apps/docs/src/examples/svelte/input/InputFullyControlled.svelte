<script lang="ts">
  import { Input, Label, Description } from "@shizen-ui/svelte";

  let requestsPerMinute = $state("60");

  const MIN = 1;
  const MAX = 1000;

  function sanitize(value: string) {
    const cleaned = value.replace(/[^0-9]/g, "");
    if (cleaned === "") return "";

    const num = Number(cleaned);
    if (num > MAX) return String(MAX);
    return cleaned;
  }
</script>

<div class="flex w-full max-w-64 flex-col gap-2">
  <Label for="rate-limit">Rate limit (req/min)</Label>
  <Input
    id="rate-limit"
    bind:value={() => requestsPerMinute, (v) => (requestsPerMinute = sanitize(v))}
    placeholder="60"
  />
  <Description>
    Throttled above
    <span class="text-foreground font-medium">
      {requestsPerMinute || MIN}/min
    </span>.
  </Description>
</div>
