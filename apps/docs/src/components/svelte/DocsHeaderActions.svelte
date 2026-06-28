<script lang="ts">
  import { ButtonGroup, Button } from "@shizen-ui/svelte";

  import Icon from "@components/svelte/Icon.svelte";
  import { Copy01Icon, Tick02Icon, EllipsisIcon } from "@hugeicons/core-free-icons";

  interface Props {
    title: string;
    description?: string;
  }

  let { title, description }: Props = $props();

  let copied = $state(false);

  function isPreviewNode(el: Element): boolean {
    // ComponentExample renders the live component in the first div
    // of <section data-example-container> — skip it entirely
    const parent = el.parentElement;
    return (
      parent?.hasAttribute("data-example-container") === true && el === parent.firstElementChild
    );
  }

  function extractMarkdown(): string {
    const lines: string[] = [];

    lines.push(`# ${title}`);
    if (description) {
      lines.push("");
      lines.push(description);
    }
    lines.push("");

    const article = document.querySelector("article.docs-body");
    if (!article) return lines.join("\n");

    function walk(node: Node): void {
      if (node.nodeType !== Node.ELEMENT_NODE) return;
      const el = node as Element;
      const tag = el.tagName.toUpperCase();

      // Skip the rendered component preview — only the first child of
      // [data-example-container] holds the live Svelte island
      if (isPreviewNode(el)) return;

      // Headings → markdown prefix
      const headingLevel = ["H1", "H2", "H3", "H4", "H5", "H6"].indexOf(tag);
      if (headingLevel !== -1) {
        lines.push(`${"#".repeat(headingLevel + 1)} ${el.textContent?.trim() ?? ""}`);
        lines.push("");
        return;
      }

      // Code blocks → fenced markdown with lang from data-lang on CodeBlock wrapper
      if (tag === "PRE") {
        const codeEl = el.querySelector("code");
        if (codeEl) {
          // Shiki doesn't add language-* classes — read data-lang from CodeBlock container
          const container = el.closest("[data-lang]");
          const lang = container?.getAttribute("data-lang") ?? "";
          lines.push("```" + lang);
          lines.push(codeEl.textContent?.trimEnd() ?? "");
          lines.push("```");
          lines.push("");
        }
        return;
      }

      // Tables → markdown table
      if (tag === "TABLE") {
        const rows = [...el.querySelectorAll("tr")];
        rows.forEach((row, i) => {
          const cells = [...row.querySelectorAll("th, td")].map(
            (c) => c.textContent?.trim().replace(/\|/g, "\\|") ?? ""
          );
          lines.push("| " + cells.join(" | ") + " |");
          if (i === 0) {
            lines.push("| " + cells.map(() => "---").join(" | ") + " |");
          }
        });
        lines.push("");
        return;
      }

      // Paragraphs
      if (tag === "P") {
        const text = el.textContent?.trim();
        if (text) {
          lines.push(text);
          lines.push("");
        }
        return;
      }

      // Recurse into everything else
      for (const child of el.childNodes) {
        walk(child);
      }
    }

    for (const child of article.childNodes) {
      walk(child);
    }

    return lines
      .join("\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  async function copyPage() {
    const markdown = extractMarkdown();
    await navigator.clipboard.writeText(markdown);
    copied = true;
    setTimeout(() => (copied = false), 2000);
  }
</script>

<ButtonGroup variant="tertiary">
  <Button onclick={copyPage}>
    {#snippet startContent()}
      {#if copied}
        <Icon icon={Tick02Icon} />
      {/if}
      {#if !copied}
        <Icon icon={Copy01Icon} />
      {/if}
    {/snippet}
    {copied ? "Copied!" : "Copy page"}
  </Button>

  <Button iconOnly aria-label="More options">
    <Icon icon={EllipsisIcon} />
  </Button>
</ButtonGroup>
