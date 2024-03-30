import React, { forwardRef, useRef, useState } from "react"
import ArtworkForm, { TArtworkForm } from "../form/ArtworkForm"
import { TArtWork } from "../../context/AppContext"

type TModalProps = {
  artwork: TArtWork[]
  onClose: (TArtworkForm) => void
}

const UpdateArtworkModal = forwardRef<HTMLDialogElement, TModalProps>((props, modalRef) => {
  const { onClose, artwork } = props
  const [form, setForm] = useState<TArtworkForm>({})
  const formRef = useRef<HTMLFormElement>()

  const handleClose = () => {
    onClose(form)
    modalRef.current.close()
  }

  return (
    <dialog ref={modalRef}>
      <div className="modal-content">
        <h2>Choose The Destination</h2>
        <div className="preview-container">
          {artwork.map(({ thumbnail, _id, artCollection }) => (
            <div key={_id}>
              <img
                className="preview"
                src={thumbnail}
                alt={`An artwork from the ${artCollection} album`}
              />
            </div>
          ))}
        </div>
        <ArtworkForm ref={formRef} form={form} setForm={setForm} />

        <div className="modal-form-buttons">
          <button onClick={() => modalRef.current.close()}>Close</button>
          <button
            disabled={!form.category || !form.subCategory || !form.artCollection}
            onClick={handleClose}
          >
            Update
          </button>
        </div>
      </div>
    </dialog>
  )
})

export default UpdateArtworkModal
