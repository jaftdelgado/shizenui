<script lang="ts">
  import { buttonStyles } from "@shizen-ui/styles";
  import Icon from "@components/svelte/Icon.svelte";
  import { GithubIcon, CssFile01Icon } from "@hugeicons/core-free-icons";

  interface Props {
    sourceUrl: string;
    stylesUrl: string;
  }

  let { sourceUrl, stylesUrl }: Props = $props();

  const styles = buttonStyles({ variant: "tertiary", size: "md", iconOnly: false });
</script>

<div>
  <a href={sourceUrl} target="_blank" rel="noopener noreferrer" class={styles.base()}>
    <span class={styles.content()}>
      <span class={styles.iconStart()}>
        <Icon icon={GithubIcon} />
      </span>
      Source
    </span>
  </a>

  <a href={stylesUrl} target="_blank" rel="noopener noreferrer" class={styles.base()}>
    <span class={styles.content()}>
      <span class={styles.iconStart()}>
        <Icon icon={CssFile01Icon} />
      </span>
      Styles source
    </span>
  </a>
</div>
