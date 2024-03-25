import { useState } from "react"
import useFetchWithDebounce from "../hooks/useFetchWithDebounce"
import { TArtWork } from "../context/AppContext"
import { titleCase } from "../utils/stringUtils"

type TDeleteArtProps = {
  category: string
  subCategory: string
  artCollection: string
}

function AdminArtCollection({ category, subCategory, artCollection }: TDeleteArtProps) {
  const [artwork, pending] = useFetchWithDebounce<TArtWork[]>(
    `/api/artworks?category=${category}&subCategory=${subCategory}&artCollection=${artCollection}&limit=0`,
  )

  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [deleting, setDeleting] = useState(false)

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

  const deleteSelectedArt = async () => {
    console.log("Deleting selected artwork")
    setDeleting(true)
    try {
      while (selected.size > 0) {
        const id = selected.values().next().value
        await deleteArt(id)
        selected.delete(id)
      }
    } catch (error) {
      console.error("Failed to delete selected artwork")
      console.error(error)
    } finally {
      setSelected(new Set(selected))
      setDeleting(false)
    }
  }

  const moveSelected = async () => {
    console.log("Moving selected artwork")
    return
  }

  return (
    <section className="artwork-collection-section">
      <h2>Art Collection: {titleCase(artCollection)}</h2>
      {pending ? (
        <div>Loading...</div>
      ) : (
        <div className="collection-container">
          <div className="action-buttons">
            <button onClick={deleteSelectedArt} disabled={deleting || !selected.size}>
              {deleting ? "Deleting..." : "Delete Selected"}
            </button>
            <button onClick={moveSelected} disabled={!selected.size}>
              Move Selected
            </button>
            <button onClick={() => setSelected(new Set())} disabled={!selected.size}>
              Clear Selection
            </button>
            <button
              onClick={() => setSelected(new Set(artwork?.map(art => art._id)))}
              disabled={selected.size === artwork.length}
            >
              Select All
            </button>
          </div>
          <div className="admin-art">
            {artwork?.map(art => (
              <div className="thumbnail-preview" key={art._id}>
                <input
                  type="checkbox"
                  id={art._id}
                  value={art._id}
                  onChange={() => {
                    selected.has(art._id) ? selected.delete(art._id) : selected.add(art._id)
                    setSelected(new Set(selected))
                  }}
                  checked={selected.has(art._id)}
                />
                <label className="artwork-label" htmlFor={art._id}>
                  <img className="admin-art-thumbnail" src={art.thumbnail} alt="An artwork" />
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

export default AdminArtCollection
