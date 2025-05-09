import React, { useState } from "react"
import { Modal, TModalProps } from "./layout/Modal"
import { TArtWork, TArtworkRoles } from "../core-types"

export function UpdateRoleModal({
  art,
  role,
  handleExit,
  onSubmit,
  ...modalProps
}: {
  art: TArtWork[]
  role: TArtworkRoles
  onSubmit: (_selectedArt: string) => void
} & TModalProps) {
  const [selectedArtwork, setSelectedArtwork] = useState<string>()

  const selectArt = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedArtwork(e.target.value)
  }

  const handleSubmit = () => {
    if (!selectedArtwork) return

    setSelectedArtwork(undefined)
    onSubmit(selectedArtwork)
  }

  return (
    <Modal {...modalProps} handleExit={handleExit}>
      <div className="modal-content">
        <h2>Choose image to set to {role}</h2>
        <div className="preview-container">
          {art.map(({ thumbnails, _id, subCategory }) => (
            <label key={_id}>
              <img
                className="preview"
                src={thumbnails.small}
                alt={`An artwork from the ${subCategory} album`}
              />
              <input
                type="radio"
                name="role"
                value={_id}
                checked={selectedArtwork === _id}
                onChange={selectArt}
              />
            </label>
          ))}
        </div>
        <div className="modal-form-buttons">
          <button onClick={handleExit}>Close</button>
          <button onClick={handleSubmit}>Update</button>
        </div>
      </div>
    </Modal>
  )
}
