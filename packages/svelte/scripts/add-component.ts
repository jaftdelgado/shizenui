import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const componentName = process.argv[2];

if (!componentName) {
  console.error(
    "Please provide a component name (e.g., bun add-component my-button)",
  );
  process.exit(1);
}

const toPascalCase = (str: string) =>
  str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

const pascalName = toPascalCase(componentName);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "../../../");

const paths = {
  svelteComponents: path.join(rootDir, "packages/svelte/src/components"),
  svelteIndex: path.join(rootDir, "packages/svelte/src/index.ts"),
  stylesComponents: path.join(rootDir, "packages/styles/src/components"),
  stylesIndexCss: path.join(
    rootDir,
    "packages/styles/src/components/index.css",
  ),
  stylesVariants: path.join(rootDir, "packages/styles/src/variants"),
  stylesVariantsIndex: path.join(
    rootDir,
    "packages/styles/src/variants/index.ts",
  ),
};

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function updateIndexFile(filePath: string, lineToAdd: string) {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n").filter((line) => line.trim() !== "");

  if (!lines.some((line) => line.includes(lineToAdd))) {
    lines.push(lineToAdd);
    lines.sort();
    fs.writeFileSync(filePath, lines.join("\n") + "\n");
    console.log(`Updated: ${path.relative(rootDir, filePath)}`);
  }
}

// 1. Create Svelte component
const svelteCompDir = path.join(paths.svelteComponents, componentName);
ensureDir(svelteCompDir);

const svelteTemplate = `<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { ${componentName}Styles, type ${pascalName}Variants } from "@shizen-ui/styles";

  let { children, class: className, ...props }: ${pascalName}Variants &
    HTMLAttributes<HTMLDivElement> & {
      children?: Snippet;
    } = $props();
</script>

<div class={${componentName}Styles({ ...props, class: className })}>
  {@render children?.()}
</div>
`;

fs.writeFileSync(
  path.join(svelteCompDir, `${pascalName}.svelte`),
  svelteTemplate,
);
fs.writeFileSync(
  path.join(svelteCompDir, "index.ts"),
  `export { default as ${pascalName} } from "./${pascalName}.svelte";\n`,
);
console.log(`Created Svelte component: ${componentName}`);

// 2. Update Svelte entry point
updateIndexFile(
  paths.svelteIndex,
  `export * from "./components/${componentName}/index.ts";`,
);

// 3. Create CSS file
ensureDir(paths.stylesComponents);
fs.writeFileSync(
  path.join(paths.stylesComponents, `${componentName}.css`),
  `.${componentName} {\n  display: block;\n}\n`,
);
console.log(`Created CSS: ${componentName}.css`);

// 4. Update styles index CSS
updateIndexFile(paths.stylesIndexCss, `@import "./${componentName}.css";`);

// 5. Create variants
const variantsDir = path.join(paths.stylesVariants, componentName);
ensureDir(variantsDir);

const stylesTemplate = `import { tv, type VariantProps } from "tailwind-variants";

export const ${componentName}Styles = tv({
  base: "${componentName}",
  variants: {
    invalid: {
      true: "${componentName}--invalid"
    },
    disabled: {
      true: "${componentName}--disabled"
    }
  },
  defaultVariants: {
    invalid: false,
    disabled: false
  }
});

export type ${pascalName}Variants = VariantProps<typeof ${componentName}Styles>;
`;

fs.writeFileSync(
  path.join(variantsDir, `${componentName}.styles.ts`),
  stylesTemplate,
);
fs.writeFileSync(
  path.join(variantsDir, "index.ts"),
  `export * from "./${componentName}.styles";\n`,
);
console.log(`Created variants: ${componentName}`);

// 6. Update variants index
updateIndexFile(
  paths.stylesVariantsIndex,
  `export * from "./${componentName}";`,
);

console.log(`\n✓ Component "${componentName}" generated successfully.`);
