/** Whether the user is on macOS. Read at the time of the event: there is no navigator on the server. */
export function isMac(): boolean {
  if (typeof navigator === "undefined") return false;
  const platform =
    (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData?.platform ??
    navigator.platform;
  return /^mac/i.test(platform);
}
