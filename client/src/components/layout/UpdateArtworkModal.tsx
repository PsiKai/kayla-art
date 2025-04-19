import React, { useState } from "react"
import ArtworkForm, { TArtworkForm } from "../form/ArtworkForm"
import { Modal, TModalProps } from "./Modal"
import { TArtWork } from "../../core-types"

type TUpdateModalProps = {
  artwork: TArtWork[]
  onSubmit: (_form: TArtworkForm) => void
} & TModalProps

const UpdateArtworkModal: React.FC<TUpdateModalProps> = props => {
  const { onSubmit, artwork, handleExit, ...modalProps } = props
  const [form, setForm] = useState<TArtworkForm>({})

  const handleSubmit = () => {
    onSubmit(form)
  }

  return (
    <Modal {...modalProps} handleExit={handleExit}>
      <div className="modal-content">
        <h2>Choose The Destination</h2>
        <div className="preview-container">
          {artwork.map(({ thumbnails, _id, artCollection }) => (
            <div key={_id}>
              <img
                className="preview"
                src={thumbnails.small}
                alt={`An artwork from the ${artCollection} album`}
              />
            </div>
          ))}
        </div>
        <ArtworkForm form={form} setForm={setForm} />

        <div className="modal-form-buttons">
          <button onClick={handleExit}>Close</button>
          <button disabled={!form.category || !form.subCategory} onClick={handleSubmit}>
            Update
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default UpdateArtworkModal
