import { FC } from "react"
import { TArtWork } from "../../context/AppContext"
import { Modal, TModalProps } from "./Modal"

type TDeleteModalProps = {
  artwork: TArtWork[]
  onSubmit: () => void
} & TModalProps

const DeleteArtworkModal: FC<TDeleteModalProps> = props => {
  const { artwork, onSubmit, handleExit, ...modalProps } = props

  const handleSubmit = () => {
    onSubmit()
  }

  return (
    <Modal {...modalProps} handleExit={handleExit}>
      <div className="modal-content">
        <h2>Delete This Artwork?</h2>
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
        <div className="modal-form-buttons">
          <button onClick={handleExit}>Close</button>
          <button onClick={handleSubmit}>Delete</button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteArtworkModal
