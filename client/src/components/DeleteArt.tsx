import useFetchOnRender from "../hooks/useFetchOnRender"
import { TArtWork } from "../context/AppContext"

function DeleteArt() {
  const [artwork, pending] = useFetchOnRender<TArtWork[]>("/api/artworks")

  const deleteArt = async (_id: string) => {
    console.log("Deleting artwork")
    console.log(_id)
    try {
      const response = await fetch(`/api/artworks/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (response.ok) {
        console.log("Artwork deleted")
      } else {
        console.error("Failed to delete artwork")
      }
    } catch (error) {
      console.error("Failed to delete artwork")
      console.error(error)
    }
  }

  return (
    <>
      <h2>DeleteArt</h2>
      {pending ? (
        <div>Loading...</div>
      ) : (
        <div className="admin-art">
          {artwork.map(art => (
            <div>
              <img className="admin-art-thumbnail" src={art.thumbnail} alt="An artwork" />
              <button onClick={() => deleteArt(art._id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default DeleteArt
