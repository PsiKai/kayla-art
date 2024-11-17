export async function deleteArt(_id: string) {
  const response = await fetch(`/api/artworks/${_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
  if (response.ok) {
    return true
  } else {
    throw new Error("Failed to delete artwork")
  }
}
