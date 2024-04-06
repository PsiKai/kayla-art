import { useRef, useState } from "react"
import ArtworkForm, { TArtworkForm } from "../form/ArtworkForm"
import { TArtWork } from "../../context/AppContext"

type TModalProps = {
  artwork: TArtWork[]
  onClose: (form: TArtworkForm) => void
  modalRef: React.RefObject<HTMLDialogElement>
}

const UpdateArtworkModal: React.FC<TModalProps> = props => {
  const { onClose, artwork, modalRef } = props
  const [form, setForm] = useState<TArtworkForm>({})
  const formRef = useRef<HTMLFormElement>(null)

  const handleClose = () => {
    onClose(form)
    modalRef.current?.close()
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
        <ArtworkForm formRef={formRef} form={form} setForm={setForm} />

        <div className="modal-form-buttons">
          <button onClick={() => modalRef.current?.close()}>Close</button>
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
}

export default UpdateArtworkModal
