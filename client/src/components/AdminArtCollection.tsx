import { useEffect, useState, useContext, useRef } from "react"
import useFetchWithDebounce from "../hooks/useFetchWithDebounce"
import { AppContext } from "../context/AppContext"
import { TArtWork } from "../context/AppContext"
import { titleCase } from "../utils/stringUtils"
import UpdateArtworkModal from "./layout/UpdateArtworkModal"
import { TArtworkForm } from "./form/ArtworkForm"
import DeleteArtworkModal from "./layout/DeleteArtworkModal"
import AdminArtworkLayout from "./layout/AdminArtworkLayout"
import { ApiContext } from "../context/ApiContext"

type TDeleteArtProps = {
  category: string
  subCategory: string
}

function AdminArtCollection({ category, subCategory }: TDeleteArtProps) {
  const {
    state: { art },
    dispatch,
  } = useContext(AppContext)
  const { pending, updateArtwork, deleteArtwork } = useContext(ApiContext)

  const updateModalRef = useRef<HTMLDialogElement>(null)
  const deleteModalRef = useRef<HTMLDialogElement>(null)

  const [artwork, fetchPending] = useFetchWithDebounce<TArtWork[]>(
    `/api/artworks?category=${category}&subCategory=${subCategory}&limit=0`,
  )

  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [selectedArtwork, setSelectedArtwork] = useState<TArtWork[]>([])

  useEffect(() => {
    dispatch({ type: "SET_ARTWORK", payload: artwork })
  }, [artwork, dispatch])

  const deleteSelectedArt = async () => {
    console.log("Deleting selected artwork")
    while (selected.size > 0) {
      const id = selected.values().next().value
      if (!id) continue

      await deleteArtwork(id)
      selected.delete(id)
    }
    setSelected(new Set(selected))
  }

  const submitSelectedArtEdits = async (values: TArtworkForm) => {
    const selectedArt = art.find(({ _id }) => selected.has(_id))
    if (!selectedArt) {
      console.log("No selected artwork found")
      return
    }
    if (
      selectedArt.category === values.category &&
      selectedArt.subCategory === values.subCategory
    ) {
      console.log("No changes made")
      return
    }
    console.log("Moving selected artwork")
    console.log(values)
    while (selected.size > 0) {
      const _id = selected.values().next().value
      if (!_id) continue

      await updateArtwork(values, _id)
      selected.delete(_id)
    }
    setSelected(new Set(selected))
  }

  const selectArt = (e: React.ChangeEvent<HTMLInputElement>) => {
    const _id = e.target.value
    selected.has(_id) ? selected.delete(_id) : selected.add(_id)
    setSelected(new Set(selected))
  }

  const openModal = (modalRef: React.RefObject<HTMLDialogElement>) => {
    const selectedArt = art.filter(({ _id }) => selected.has(_id))
    setSelectedArtwork(selectedArt)
    modalRef.current?.showModal()
  }

  return (
    <section className="artwork-collection-section">
      <h2>
        {titleCase(category)} {titleCase(subCategory)}
      </h2>
      {fetchPending ? (
        <div>Loading...</div>
      ) : (
        <div className="collection-container">
          <div className="action-buttons">
            <button
              onClick={() => openModal(deleteModalRef)}
              disabled={!selected.size || !!pending}
            >
              {pending ? "Deleting..." : "Delete Selected"}
            </button>
            <button
              onClick={() => openModal(updateModalRef)}
              disabled={!!pending || !selected.size}
            >
              {pending ? "Moving..." : "Move Selected"}
            </button>
            <button onClick={() => setSelected(new Set())} disabled={!selected.size || !!pending}>
              Clear Selection
            </button>
            <button
              onClick={() => setSelected(new Set(art.map(art => art._id)))}
              disabled={selected.size === art.length || !!pending}
            >
              Select All
            </button>
          </div>
          <AdminArtworkLayout
            art={art}
            deleting={pending}
            editing={pending}
            selected={selected}
            selectArt={selectArt}
          />
        </div>
      )}
      <UpdateArtworkModal
        modalRef={updateModalRef}
        onClose={submitSelectedArtEdits}
        artwork={selectedArtwork}
      />
      <DeleteArtworkModal
        modalRef={deleteModalRef}
        onClose={deleteSelectedArt}
        artwork={selectedArtwork}
      />
    </section>
  )
}

export default AdminArtCollection
// <div className="form-field">
//   <label htmlFor="none">none</label>
//   <input
//     type="radio"
//     id="none"
//     name="role"
//     value=""
//     onChange={updateRole}
//     checked={!form.role}
//   />
//   <label htmlFor="carousel">Carousel</label>
//   <input
//     type="radio"
//     id="carousel"
//     name="role"
//     value="carousel"
//     onChange={updateRole}
//     checked={form.role === "carousel"}
//   />
//   <label htmlFor="hero">hero</label>
//   <input
//     type="radio"
//     id="hero"
//     name="role"
//     value="hero"
//     onChange={updateRole}
//     checked={form.role === "hero"}
//   />
//   <label htmlFor="main">main</label>
//   <input
//     type="radio"
//     id="main"
//     name="role"
//     value="main"
//     onChange={updateRole}
//     checked={form.role === "main"}
//   />
// </div>
