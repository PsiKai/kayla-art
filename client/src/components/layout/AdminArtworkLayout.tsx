import { useCallback, useContext, useMemo, useState } from "react"
import { TArtWork, TArtworkRoles } from "../../context/AppContext"
import { ApiContext } from "../../context/ApiContext"
import { TArtworkForm } from "../form/ArtworkForm"
import { UpdateRoleModal } from "../UpdateRoleModal"
import { SelectableImageThumbnail } from "./SelectableImageThumbnail"

type TAdminArtworkLayout = {
  art: TArtWork[]
  deleting: string | null
  editing: string | null
  selectedIds: Set<string>
  selectArt: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function AdminArtworkLayout({
  art,
  deleting,
  editing,
  selectedIds,
  selectArt,
}: TAdminArtworkLayout) {
  const { updateArtwork } = useContext(ApiContext)

  const [modalOpen, setModalOpen] = useState<TArtworkRoles | null>()
  const { hero, carousel, main, gallery } = useMemo(() => {
    return art.reduce<{
      hero: TArtWork[]
      carousel: TArtWork[]
      main: TArtWork[]
      gallery: TArtWork[]
    }>(
      (acc, artwork) => {
        acc[artwork.role].push(artwork)
        return acc
      },
      { hero: [], carousel: [], main: [], gallery: [] },
    )
  }, [art])

  const onSubmit = useCallback(
    async (selectedArt: string) => {
      console.log(selectedArt)
      const selected = art.find(({ _id }) => _id === selectedArt)
      setModalOpen(null)
      const updatedArtwork: TArtworkForm = {
        category: selected!.category,
        subCategory: selected!.subCategory,
        role: modalOpen!,
      }
      await updateArtwork(updatedArtwork, selectedArt)
    },
    [art, modalOpen, updateArtwork],
  )

  return (
    <div>
      <UpdateRoleModal
        open={!!modalOpen}
        handleExit={() => setModalOpen(null)}
        art={art.filter(a => a.role !== modalOpen)}
        role={modalOpen!}
        onSubmit={onSubmit}
      />
      <div>
        <h2>Main Page Carousel</h2>
        {carousel.length ? (
          <div className="admin-art">
            {carousel.map(artwork => (
              <SelectableImageThumbnail
                key={artwork._id}
                _id={artwork._id}
                thumbnails={artwork.thumbnails}
                selectArt={selectArt}
                selectedIds={selectedIds}
                deleting={deleting}
                editing={editing}
              />
            ))}
          </div>
        ) : (
          <p>No artwork from this category in the main page carousel</p>
        )}
        <button onClick={() => setModalOpen("carousel")}>Choose new Carousel image</button>
      </div>
      <div>
        <h2>Main Page</h2>
        {main.length ? (
          <div className="admin-art">
            {main.map(artwork => (
              <SelectableImageThumbnail
                key={artwork._id}
                _id={artwork._id}
                thumbnails={artwork.thumbnails}
                selectArt={selectArt}
                selectedIds={selectedIds}
                deleting={deleting}
                editing={editing}
              />
            ))}
          </div>
        ) : (
          <p>No artwork from this category in the main page</p>
        )}
        <button onClick={() => setModalOpen("main")}>Choose new Main page image</button>
      </div>
      <div>
        <h2>Section Hero</h2>
        {hero.length ? (
          <div className="admin-art">
            {hero.map(artwork => (
              <SelectableImageThumbnail
                key={artwork._id}
                _id={artwork._id}
                thumbnails={artwork.thumbnails}
                selectArt={selectArt}
                selectedIds={selectedIds}
                deleting={deleting}
                editing={editing}
              />
            ))}
          </div>
        ) : (
          <p>No artwork from this category in the section hero</p>
        )}
        <button onClick={() => setModalOpen("hero")}>Choose new Hero image</button>
      </div>
      <div>
        <h2>Gallery</h2>
        <div className="admin-art">
          {gallery.map(artwork => (
            <SelectableImageThumbnail
              key={artwork._id}
              _id={artwork._id}
              thumbnails={artwork.thumbnails}
              selectArt={selectArt}
              selectedIds={selectedIds}
              deleting={deleting}
              editing={editing}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
