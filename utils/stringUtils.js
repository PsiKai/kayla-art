export const slugify = str => {
  return str
    .split(" ")
    .map(word => word.toLowerCase())
    .join("-")
}

export function capitalize(str) {
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}
