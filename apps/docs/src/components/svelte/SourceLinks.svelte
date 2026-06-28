<script lang="ts">
  import { Button } from "@shizen-ui/svelte";
  import Icon from "@components/svelte/Icon.svelte";
  import { GithubIcon, CssFile01Icon } from "@hugeicons/core-free-icons";

  interface Props {
    sourceUrl: string;
    stylesUrl: string;
  }

  let { sourceUrl, stylesUrl }: Props = $props();

  function openSource() {
    window.open(sourceUrl, "_blank", "noopener,noreferrer");
  }

  function openStyles() {
    window.open(stylesUrl, "_blank", "noopener,noreferrer");
  }
</script>

<div>
  <Button variant="tertiary" onclick={openSource}>
    {#snippet startContent()}
      <Icon icon={GithubIcon} />
    {/snippet}
    Source
  </Button>

  <Button variant="tertiary" onclick={openStyles}>
    {#snippet startContent()}
      <Icon icon={CssFile01Icon} />
    {/snippet}
    Styles source
  </Button>
</div>
