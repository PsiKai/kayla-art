export function titleCase(s: string | undefined): string {
  if (!s) return ""

  return s.split("-").map(capitalize).join(" ")
}

export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export function slugify(s: string): string {
  return s.toLowerCase().replace(/ /g, "-")
}
