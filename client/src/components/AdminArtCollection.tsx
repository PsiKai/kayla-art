import React, { useEffect, useState, useContext, useCallback } from "react"
import { titleCase } from "../utils/stringUtils"
import UpdateArtworkModal from "./layout/UpdateArtworkModal"
import { TArtworkForm } from "./form/ArtworkForm"
import DeleteArtworkModal from "./layout/DeleteArtworkModal"
import AdminArtworkLayout from "./layout/AdminArtworkLayout"
import GenericSelection, { TGenericSelectionProps } from "./form/GenericSelection"
import Loading from "./layout/Loading"
import { AppContext } from "../context/appContext"
import { ApiContext } from "../context/apiContext"
import { isValidRole, TArtWork } from "../core-types"
import useFetchOnRender from "../hooks/useFetchOnRender"

type TDeleteArtProps = {
  category: string
  subCategory: string
}

function AdminArtCollection({ category, subCategory }: TDeleteArtProps) {
  const {
    state: { art },
    dispatch,
  } = useContext(AppContext)
  const { artworkPending, updateArtwork, deleteArtwork } = useContext(ApiContext)
  const [openModal, setOpenModal] = useState<"update" | "delete" | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [selectedArtwork, setSelectedArtwork] = useState<TArtWork[]>([])

  const [artwork, fetchPending] = useFetchOnRender<TArtWork[]>(
    `/api/artworks?category=${category}&subCategory=${subCategory}&limit=0`,
  )

  useEffect(() => {
    setSelectedIds(new Set())
  }, [category, subCategory])

  useEffect(() => {
    dispatch({ type: "SET_ARTWORKS", payload: artwork })
  }, [artwork, dispatch])

  const deleteSelectedArt = useCallback(async () => {
    console.log("Deleting selected artwork")
    setOpenModal(null)
    while (selectedIds.size > 0) {
      const id = selectedIds.values().next().value
      if (!id) continue

      await deleteArtwork(id)
      selectedIds.delete(id)
      setSelectedIds(new Set(selectedIds))
    }
  }, [selectedIds, deleteArtwork])

  const submitSelectedArtEdits = useCallback(
    async (values: TArtworkForm) => {
      setOpenModal(null)
      const selectedArt = art?.find(({ _id }) => selectedIds.has(_id))
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
      while (selectedIds.size > 0) {
        const _id = selectedIds.values().next().value
        if (!_id) continue

        await updateArtwork(values, _id)
        selectedIds.delete(_id)
      }
      setSelectedIds(new Set(selectedIds))
    },
    [selectedIds, updateArtwork, art],
  )

  const selectArt = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const _id = e.target.value
      if (selectedIds.has(_id)) selectedIds.delete(_id)
      else selectedIds.add(_id)
      setSelectedIds(new Set(selectedIds))
    },
    [selectedIds],
  )

  const openSelectedModal = useCallback(
    (modalType: "update" | "delete") => {
      const selectedArt = art?.filter(({ _id }) => selectedIds.has(_id))
      setSelectedArtwork(selectedArt)
      setOpenModal(modalType)
    },
    [art, selectedIds],
  )

  const updateRole = useCallback<TGenericSelectionProps["updateForm"]>(
    e => {
      console.log("Updating role", e.target.value)
      if (!isValidRole(e.target.value)) return

      const role = e.target.value

      console.log(selectedIds)
      const selectedArt = art?.find(({ _id }) => selectedIds.has(_id))
      if (!selectedArt) {
        console.log("No selected artwork found")
        return
      }
      console.log("Updating role for selected artwork", selectedArt, role)
      const updatedArtwork: TArtworkForm = {
        category: selectedArt.category,
        subCategory: selectedArt.subCategory,
        role,
      }
      void updateArtwork(updatedArtwork, selectedArt._id)
    },
    [selectedIds, updateArtwork, art],
  )

  return (
    <section className="artwork-collection-section">
      <h2>
        {titleCase(category)} {titleCase(subCategory)}
      </h2>
      {fetchPending ? (
        <Loading />
      ) : (
        <div className="collection-container">
          <div className="action-buttons">
            <button
              onClick={() => openSelectedModal("delete")}
              disabled={!selectedIds.size || !!artworkPending}
            >
              {artworkPending ? "Deleting..." : "Delete Selected"}
            </button>
            <button
              onClick={() => openSelectedModal("update")}
              disabled={!!artworkPending || !selectedIds.size}
            >
              {artworkPending ? "Editing..." : "Edit Selected"}
            </button>
            <button
              onClick={() => setSelectedIds(new Set())}
              disabled={!selectedIds.size || !!artworkPending}
            >
              Clear Selection
            </button>
            <button
              onClick={() => setSelectedIds(new Set(art.map(art => art._id)))}
              disabled={selectedIds.size === art?.length || !!artworkPending}
            >
              Select All
            </button>
          </div>
          <form>
            {selectedIds.size === 1 ? (
              <GenericSelection
                allValues={["carousel", "hero", "main", "gallery"]}
                valueType="role"
                selectedValue={art.find(({ _id }) => selectedIds.has(_id))?.role || ""}
                updateForm={updateRole}
                disabled={!!artworkPending}
              />
            ) : null}
          </form>
          <AdminArtworkLayout
            art={art}
            deleting={artworkPending}
            editing={artworkPending}
            selectedIds={selectedIds}
            selectArt={selectArt}
          />
        </div>
      )}
      <UpdateArtworkModal
        open={openModal === "update"}
        handleExit={() => setOpenModal(null)}
        onSubmit={e => void submitSelectedArtEdits(e)}
        artwork={selectedArtwork}
      />
      <DeleteArtworkModal
        open={openModal === "delete"}
        handleExit={() => setOpenModal(null)}
        onSubmit={() => void deleteSelectedArt()}
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
