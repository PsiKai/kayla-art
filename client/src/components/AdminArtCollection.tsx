import { useEffect, useState, useContext, useRef } from "react"
import useFetchWithDebounce from "../hooks/useFetchWithDebounce"
import { AppContext } from "../context/AppContext"
import { TArtWork } from "../context/AppContext"
import { titleCase } from "../utils/stringUtils"
import UpdateArtworkModal from "./layout/UpdateArtworkModal"
import { TArtworkForm } from "./form/ArtworkForm"

type TDeleteArtProps = {
  category: string
  subCategory: string
  artCollection: string
}

function AdminArtCollection({ category, subCategory, artCollection }: TDeleteArtProps) {
  const {
    state: { art },
    dispatch,
  } = useContext(AppContext)

  const updateModalRef = useRef<HTMLDialogElement>(null)

  const [artwork, pending] = useFetchWithDebounce<TArtWork[]>(
    `/api/artworks?category=${category}&subCategory=${subCategory}&artCollection=${artCollection}&limit=0`,
  )

  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [deleting, setDeleting] = useState<string | null>(null)
  const [editing, setEditing] = useState<string | null>(null)

  useEffect(() => {
    dispatch({ type: "SET_ARTWORK", payload: artwork })
  }, [artwork, dispatch])

  const deleteArt = async (_id: string) => {
    setDeleting(_id)
    try {
      const response = await fetch(`/api/artworks/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (response.ok) {
        dispatch({ type: "DELETE_ARTWORK", payload: _id })
        console.log("Artwork deleted")
      } else {
        console.error("Failed to delete artwork")
        console.error(response)
      }
    } catch (error) {
      console.error("Failed to delete artwork")
      console.error(error)
    }
  }

  const deleteSelectedArt = async () => {
    console.log("Deleting selected artwork")
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
      setDeleting(null)
    }
  }

  const moveArt = async (values: TArtworkForm, _id: string) => {
    setEditing(_id)
    try {
      const response = await fetch(`/api/artworks/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
      if (response.ok) {
        console.log("Artwork moved")
        dispatch({ type: "DELETE_ARTWORK", payload: _id })
      } else {
        console.error("Failed to move artwork")
        console.error(response)
      }
    } catch (error) {
      console.error("Failed to move artwork")
      console.error(error)
    }
  }

  const moveSelectedArt = async (values: TArtworkForm) => {
    const selectedArt = art.find(({ _id }) => selected.has(_id))
    if (!selectedArt) {
      console.log("No selected artwork found")
      return
    }
    if (
      selectedArt.category === values.category &&
      selectedArt.subCategory === values.subCategory &&
      selectedArt.artCollection === values.artCollection
    ) {
      console.log("No changes made")
      return
    }
    console.log("Moving selected artwork")
    console.log(values)
    try {
      while (selected.size > 0) {
        const _id = selected.values().next().value
        await moveArt(values, _id)
        selected.delete(_id)
      }
    } catch (error) {
      console.error("Failed to move selected artwork")
      console.error(error)
    } finally {
      setSelected(new Set(selected))
      setEditing(null)
    }
  }

  const selectArt = (e: React.ChangeEvent<HTMLInputElement>) => {
    const _id = e.target.value
    selected.has(_id) ? selected.delete(_id) : selected.add(_id)
    setSelected(new Set(selected))
  }

  return (
    <section className="artwork-collection-section">
      <h2>Art Collection: {titleCase(artCollection)}</h2>
      {pending ? (
        <div>Loading...</div>
      ) : (
        <div className="collection-container">
          <div className="action-buttons">
            <button
              onClick={deleteSelectedArt}
              disabled={!!deleting || !selected.size || !!editing}
            >
              {deleting ? "Deleting..." : "Delete Selected"}
            </button>
            <button
              onClick={() => updateModalRef.current?.showModal()}
              disabled={!!editing || !selected.size || !!deleting}
            >
              {editing ? "Moving..." : "Move Selected"}
            </button>
            <button
              onClick={() => setSelected(new Set())}
              disabled={!selected.size || !!editing || !!deleting}
            >
              Clear Selection
            </button>
            <button
              onClick={() => setSelected(new Set(art.map(art => art._id)))}
              disabled={selected.size === art.length || !!editing || !!deleting}
            >
              Select All
            </button>
          </div>
          <div className="admin-art">
            {art.map(({ _id, thumbnail }) => (
              <div
                className={`thumbnail-preview ${
                  deleting === _id || editing === _id ? "pending" : ""
                }`}
                key={_id}
              >
                <input
                  type="checkbox"
                  id={_id}
                  value={_id}
                  onChange={selectArt}
                  checked={selected.has(_id)}
                  disabled={!!deleting || !!editing}
                />
                <label className="artwork-label" htmlFor={_id}>
                  <img className="admin-art-thumbnail" src={thumbnail} alt="An artwork" />
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
      <UpdateArtworkModal ref={updateModalRef} onClose={moveSelectedArt} artwork={selected} />
    </section>
  )
}

export default AdminArtCollection
