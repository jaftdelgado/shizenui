const GITHUB_BASE = "https://github.com/jaftdelgado/shizenui/blob/develop";

export const toKebab = (str: string) => str.toLowerCase().replace(/\s+/g, "-");

export const toPascal = (str: string) =>
  str.replace(/(?:^|\s)(\w)/g, (_: string, c: string) => c.toUpperCase()).replace(/\s+/g, "");

export interface DocLinks {
  sourceUrl: string;
  stylesUrl: string;
}

export function resolveDocLinks(title: string, sourceFile?: string, styleFile?: string): DocLinks {
  const slug = toKebab(title);
  const pascal = toPascal(title);

  const resolvedSourceFile = sourceFile ?? `${slug}/${pascal}.svelte`;
  const resolvedStyleFile = styleFile ?? `${slug}.css`;

  return {
    sourceUrl: `${GITHUB_BASE}/packages/svelte/src/components/${resolvedSourceFile}`,
    stylesUrl: `${GITHUB_BASE}/packages/styles/src/components/${resolvedStyleFile}`
  };
}
