<script lang="ts">
  import { Switch, SwitchGroup, Label, Description } from "@shizen-ui/svelte";

  // ================================================================
  // Estado compartido para los patrones
  // ================================================================
  let v1 = $state(false);

  let notifications = $state({
    email: false,
    sms: true,
    push: true
  });

  let privacy = $state({
    analytics: true,
    marketing: false,
    thirdParty: false
  });

  let readonly = $state({
    api: true,
    audit: true,
    compliance: false
  });
</script>

<div class="flex flex-col gap-12 p-8">
  <!-- ================================================================ -->
  <!-- PATRÓN 1 — SwitchGroup básico con Label y Description del grupo  -->
  <!-- Esperado: role="group" con aria-labelledby y aria-describedby    -->
  <!-- Narrador: "Notification Channels, grupo,                         -->
  <!--            Choose how you want to be notified."                  -->
  <!-- Switches individuales anuncian su propio label y descripción     -->
  <!-- ================================================================ -->
  <section>
    <p class="mb-2 font-mono text-sm text-gray-500">Patrón 1 — Label + Description del grupo</p>
    <SwitchGroup>
      <Label>Notification Channels</Label>
      <Description>Choose how you want to be notified.</Description>
      <SwitchGroup.Items>
        <Switch bind:checked={notifications.email}>
          <Switch.Control />
          <Switch.Content>
            <Label>Email</Label>
            <Description>Receive updates via email.</Description>
          </Switch.Content>
        </Switch>
        <Switch bind:checked={notifications.sms}>
          <Switch.Control />
          <Switch.Content>
            <Label>SMS</Label>
            <Description>Get alerts as text messages.</Description>
          </Switch.Content>
        </Switch>
        <Switch bind:checked={notifications.push}>
          <Switch.Control />
          <Switch.Content>
            <Label>Push</Label>
            <Description>Enable browser notifications.</Description>
          </Switch.Content>
        </Switch>
      </SwitchGroup.Items>
    </SwitchGroup>
  </section>
</div>
