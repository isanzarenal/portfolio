/** Deterministic, purely decorative 7-char hex "commit hash" derived from a seed string — no real meaning, just consistent per entry. */
export function commitHash(seed: string): string {
  let hash = 0x811c9dc5
  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193)
  }
  return (hash >>> 0).toString(16).padStart(8, '0').slice(0, 7)
}
