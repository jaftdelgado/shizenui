<script lang="ts">
  import { Input, Label } from "@shizen-ui/svelte";
</script>

<div class="grid w-full max-w-64 gap-4">
  <div class="flex flex-col gap-2">
    <Label for="number">Number</Label>
    <Input id="number" type="number" placeholder="Quantity" />
  </div>

  <div class="flex flex-col gap-2">
    <Label for="email-type">Email</Label>
    <Input id="email-type" type="email" placeholder="name@example.com" />
  </div>

  <div class="flex flex-col gap-2">
    <Label for="password">Password</Label>
    <Input id="password" type="password" placeholder="Enter your password" />
  </div>

  <div class="flex flex-col gap-2">
    <Label for="phone">Phone</Label>
    <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
  </div>
</div>
