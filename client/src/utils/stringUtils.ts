export function titleCase(s: string | undefined): string {
  if (!s) return ""

  return s.split("-").map(capitalize).join(" ")
}

export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
