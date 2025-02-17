import { useMemo } from "react"
import { TArtWork } from "../../context/AppContext"

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
  const sectionHero = useMemo(() => art.find(({ role }) => role === "hero"), [art])
  const mainPageCarousel = useMemo(() => art.filter(({ role }) => role === "carousel"), [art])
  const mainPage = useMemo(() => art.filter(({ role }) => role === "main"), [art])
  const gallery = useMemo(() => art.filter(({ role }) => role === "gallery"), [art])

  return (
    <div>
      <div>
        <h2>Main Page Carousel</h2>
        {mainPageCarousel.length ? (
          <div className="admin-art">
            {mainPageCarousel.map(artwork => (
              <ArtThumbnail
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
      </div>
      <div>
        <h2>Main Page</h2>
        {mainPage.length ? (
          <div className="admin-art">
            <ArtThumbnail
              _id={mainPage[0]._id}
              thumbnails={mainPage[0].thumbnails}
              selectArt={selectArt}
              selectedIds={selectedIds}
              deleting={deleting}
              editing={editing}
            />
          </div>
        ) : (
          <p>No artwork from this category in the main page</p>
        )}
      </div>
      <div>
        <h2>Section Hero</h2>
        {sectionHero ? (
          <div className="admin-art">
            <ArtThumbnail
              key={sectionHero}
              _id={sectionHero._id}
              thumbnails={sectionHero.thumbnails}
              selectArt={selectArt}
              selectedIds={selectedIds}
              deleting={deleting}
              editing={editing}
            />
          </div>
        ) : (
          <p>No artwork from this category in the section hero</p>
        )}
      </div>
      <div>
        <h2>Gallery</h2>
        <div className="admin-art">
          {gallery.map(artwork => (
            <ArtThumbnail
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

function ArtThumbnail({ _id, thumbnails, selectArt, selectedIds, deleting, editing }: any) {
  return (
    <div
      className={`thumbnail-preview ${deleting === _id || editing === _id ? "pending" : ""}`}
      key={_id}
    >
      <input
        type="checkbox"
        id={_id}
        value={_id}
        onChange={selectArt}
        checked={selectedIds.has(_id)}
        disabled={!!deleting || !!editing}
      />
      <label className="artwork-label" htmlFor={_id}>
        <img className="admin-art-thumbnail" src={thumbnails["375"]} alt="An artwork" />
      </label>
    </div>
  )
}
