import useFetchOnRender from "../hooks/useFetchOnRender"
import { TArtWork } from "../context/AppContext"

function DeleteArt() {
  const [artwork, pending] = useFetchOnRender<TArtWork[]>("/api/artworks")

  const deleteArt = async (_id: string) => {
    console.log("Deleting artwork")
    console.log(_id)
    // const response = await fetch("/api/artworks", {
    //   method: "DELETE",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({}),
    // })
    //
    // if (response.ok) {
    //   console.log("Artwork deleted")
    // } else {
    //   console.error("Failed to delete artwork")
    // }
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
