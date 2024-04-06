import { FC } from "react"
import { TArtWork } from "../../context/AppContext"

type TModalProps = {
  artwork: TArtWork[]
  onClose: () => void
  modalRef: React.RefObject<HTMLDialogElement>
}

const DeleteArtworkModal: FC<TModalProps> = props => {
  const { onClose, artwork, modalRef } = props

  const handleClose = () => {
    onClose()
    modalRef?.current?.close()
  }

  return (
    <dialog ref={modalRef}>
      <div className="modal-content">
        <h2>Delete This Artwork?</h2>
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
        <div className="modal-form-buttons">
          <button onClick={() => modalRef?.current?.close()}>Close</button>
          <button onClick={handleClose}>Delete</button>
        </div>
      </div>
    </dialog>
  )
}

export default DeleteArtworkModal
