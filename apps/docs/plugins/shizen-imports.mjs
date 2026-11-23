import { readFileSync, realpathSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const PKG = "@shizen-ui/svelte";
// Anchored to the start of a line so import snippets inside strings (code shown in the docs) are left alone.
const IMPORT_RE = /^import\s*\{([^}]+)\}\s*from\s*["']@shizen-ui\/svelte["'];?/gm;
const SKIPPED_ID_RE = /\?raw|\.mdx?$/;

/** Maps every value exported by the package barrel to the component index that defines it. */
function buildExportMap() {
  const root = realpathSync(fileURLToPath(new URL(`../node_modules/${PKG}`, import.meta.url)));
  const barrel = readFileSync(join(root, "src/index.ts"), "utf8");
  const map = new Map();
  for (const [, rel] of barrel.matchAll(/export\s*\*\s*from\s*"\.\/([^"]+)"/g)) {
    const file = join(root, "src", rel.replace(/\.js$/, ".ts")).replaceAll("\\", "/");
    const source = readFileSync(file, "utf8");
    for (const [, name] of source.matchAll(/export\s+const\s+(\w+)/g)) map.set(name, file);
    for (const [, specifiers] of source.matchAll(/export\s*\{([^}]+)\}\s*from/g)) {
      for (const spec of specifiers.split(",")) {
        const name = spec
          .trim()
          .split(/\s+as\s+/)
          .pop();
        if (name) map.set(name, file);
      }
    }
  }
  return map;
}

/**
 * Rewrites `import { Button } from "@shizen-ui/svelte"` into an import of that component only.
 *
 * The package entry re-exports every component, so in dev each page made the browser fetch the
 * whole library (~215 modules). Example sources shown in the docs (?raw) keep the barrel import.
 * The export map is built once per server; a name it does not know (e.g. a component added while
 * the server runs) keeps the original barrel import, so the rewrite never breaks an import.
 */
export function shizenDeepImports() {
  let exportMap;
  return {
    name: "shizen:svelte-deep-imports",
    // Runs on compiled JS, where import statements start at column 0 (not indented in <script>).
    enforce: "post",
    transform(code, id) {
      if (SKIPPED_ID_RE.test(id) || !code.includes(PKG)) return;
      exportMap ??= buildExportMap();
      let changed = false;
      const out = code.replace(IMPORT_RE, (statement, specifiers) => {
        const byFile = new Map();
        for (const spec of specifiers.split(",")) {
          const trimmed = spec.trim();
          if (!trimmed || trimmed.startsWith("type ")) continue;
          const imported = trimmed.split(/\s+as\s+/)[0];
          const file = exportMap.get(imported);
          if (!file) return statement;
          byFile.set(file, [...(byFile.get(file) ?? []), trimmed]);
        }
        changed = true;
        return [...byFile]
          .map(([file, specs]) => `import { ${specs.join(", ")} } from "${file}";`)
          .join("\n");
      });
      return changed ? { code: out, map: null } : undefined;
    }
  };
}
