import { readFileSync } from "node:fs";
import { createRequire } from "node:module";

const PKG = "@hugeicons/core-free-icons";
// Anchored to the start of a line so import snippets inside strings (code shown in the docs) are left alone.
const IMPORT_RE = /^import\s*\{([^}]+)\}\s*from\s*["']@hugeicons\/core-free-icons["'];?/gm;
const SKIPPED_ID_RE = /\?raw|\.mdx?$/;

/** Maps every exported name (aliases included) to the file that defines it. */
function buildExportMap() {
  const require = createRequire(import.meta.url);
  const pkgJson = require.resolve(`${PKG}/package.json`);
  const index = readFileSync(pkgJson.replace(/package\.json$/, "dist/esm/index.js"), "utf8");
  const map = new Map();
  for (const [, specifiers, file] of index.matchAll(
    /export\s*\{([^}]+)\}\s*from\s*'\.\/([^']+)\.js'/g
  )) {
    for (const spec of specifiers.split(",")) {
      const name = spec
        .trim()
        .split(/\s+as\s+/)
        .pop();
      if (name) map.set(name, file);
    }
  }
  return map;
}

/**
 * Rewrites `import { A, B } from "@hugeicons/core-free-icons"` into one deep import per icon,
 * so neither Node (SSR) nor the browser has to load the ~6000-module barrel.
 */
export function hugeiconsDeepImports() {
  let exportMap;
  return {
    name: "shizen:hugeicons-deep-imports",
    // Runs on compiled JS, where import statements start at column 0 (not indented in <script>).
    enforce: "post",
    transform(code, id) {
      if (SKIPPED_ID_RE.test(id) || !code.includes(PKG)) return;
      exportMap ??= buildExportMap();
      let changed = false;
      const out = code.replace(IMPORT_RE, (statement, specifiers) => {
        const lines = [];
        for (const spec of specifiers.split(",")) {
          const [imported, local = imported] = spec.trim().split(/\s+as\s+/);
          if (!imported) continue;
          const file = exportMap.get(imported);
          if (!file) return statement;
          lines.push(`import ${local} from "${PKG}/${file}";`);
        }
        changed = true;
        return lines.join("\n");
      });
      return changed ? { code: out, map: null } : undefined;
    }
  };
}
