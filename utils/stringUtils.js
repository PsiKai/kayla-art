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

export function camelCase(str) {
  return str
    .split(/[_-\s]/)
    .map((word, index) => {
      if (index === 0) return word.toLowerCase()
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join("")
}
