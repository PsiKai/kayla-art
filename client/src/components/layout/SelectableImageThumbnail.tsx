import { TArtWork } from "../../context/AppContext"

type TSelectableImageThumbnail = {
  _id: string
  thumbnails: TArtWork["thumbnails"]
  selectArt: (e: React.ChangeEvent<HTMLInputElement>) => void
  selectedIds: Set<string>
  deleting: string | null
  editing: string | null
}

export function SelectableImageThumbnail({
  _id,
  thumbnails,
  selectArt,
  selectedIds,
  deleting,
  editing,
}: TSelectableImageThumbnail) {
  return (
    <div className={`thumbnail-preview ${deleting === _id || editing === _id ? "pending" : ""}`}>
      <input
        type="checkbox"
        id={_id}
        value={_id}
        onChange={selectArt}
        checked={selectedIds.has(_id)}
        disabled={!!deleting || !!editing}
      />
      <label className="artwork-label" htmlFor={_id}>
        <img className="admin-art-thumbnail" src={thumbnails.small} alt="An artwork" />
      </label>
    </div>
  )
}
