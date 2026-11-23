import { readdirSync } from "node:fs";
import { pathToFileURL } from "node:url";

const EXAMPLES_DIR = "src/examples/svelte";
const FRONTMATTER_RE = /^export const frontmatter = (\{.*\});$/m;

/** Maps each preview name (e.g. "ButtonPreview") to its root-relative path. */
function indexPreviews(root) {
  const previews = new Map();
  for (const entry of readdirSync(new URL(EXAMPLES_DIR, root), { recursive: true })) {
    const path = String(entry).replaceAll("\\", "/");
    const name = path.split("/").pop();
    if (name.endsWith("Preview.astro"))
      previews.set(name.slice(0, -".astro".length), `/${EXAMPLES_DIR}/${path}`);
  }
  return previews;
}

/**
 * Lets a docs page import only its own preview.
 *
 * `DocsLayout` used to glob every `*Preview.astro` to find the one named by the page's
 * `preview` frontmatter. In dev, Astro walks everything a page imports to collect CSS,
 * so that glob compiled all previews (and the components they use) on every page.
 *
 * This plugin appends an import of the named preview to the compiled page and attaches it
 * as `frontmatter.previewComponent`, which the MDX wrapper passes to the layout.
 */
export function docsPreview() {
  let root;
  let previews;
  return {
    name: "shizen:docs-preview",
    enforce: "post",
    configResolved(config) {
      root = pathToFileURL(`${config.root}/`);
    },
    transform(code, id) {
      if (!id.endsWith(".mdx") || !id.includes("/src/pages/")) return;
      const match = code.match(FRONTMATTER_RE);
      if (!match) return;
      const { preview } = JSON.parse(match[1]);
      if (!preview) return;
      previews ??= indexPreviews(root);
      const path = previews.get(preview);
      if (!path) {
        this.error(`Preview "${preview}" not found under ${EXAMPLES_DIR} (used by ${id})`);
      }
      return {
        code: `${code}\nimport __docsPreview from ${JSON.stringify(path)};\nfrontmatter.previewComponent = __docsPreview;\n`,
        map: null
      };
    }
  };
}
