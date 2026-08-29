function mergeAriaIds(...values: Array<string | null | undefined>): string | undefined {
  const ids = values.flatMap((value) => value?.split(/\s+/) ?? []).filter(Boolean);

  return [...new Set(ids)].join(" ") || undefined;
}

export function resolveAlertLabelledBy(
  internalIds: string,
  externalIds: string | null | undefined
): string | undefined {
  return mergeAriaIds(internalIds, externalIds);
}

export function resolveAlertDescribedBy(
  internalIds: string,
  externalIds: string | null | undefined
): string | undefined {
  return mergeAriaIds(internalIds, externalIds);
}
