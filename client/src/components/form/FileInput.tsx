import React, { forwardRef } from "react"
import Dropzone from "../Dropzone"

type TFileInputProps = {
  image: Map<string, File>
  updateImage: (event: React.ChangeEvent<HTMLInputElement>) => void
  uploading: string | null
  removeStagedUpload: (file: File) => void
}

const FileInput = forwardRef<HTMLInputElement, TFileInputProps>((props, ref) => {
  const { image, updateImage, uploading, removeStagedUpload } = props

  function handleValidDrop(e: React.DragEvent) {
    console.log("Valid drop event")
    const inputRef = ref as React.MutableRefObject<HTMLInputElement>
    if (inputRef && inputRef.current) {
      inputRef.current.files = e.dataTransfer.files
      const changeEvent = new Event("change", { bubbles: true })
      inputRef.current.dispatchEvent(changeEvent)
    }
  }

  function handleInvalidDrop(e: React.DragEvent) {
    console.log("Invalid drop event")
    console.log(e.dataTransfer.items)
    // const badFile = Array.from(e.dataTransfer.items)?.find(({ type }) => !type.match(typeMatch))
    // console.log(`File with type "${badFile?.type}" is not allowed!`)
    // setAlert({
    //   message: `File with type "${badFile.type}" is not allowed!`,
    //   type: "warning",
    // })
  }

  return (
    <Dropzone
      className="file-input-dropzone"
      handleValidDrop={handleValidDrop}
      handleInvalidDrop={handleInvalidDrop}
    >
      <div>
        <legend>
          <label htmlFor="image">
            <p>
              <strong>Image</strong>
            </p>
          </label>
        </legend>
        <input
          ref={ref}
          type="file"
          id="image"
          name="image"
          accept="image/*"
          required
          onChange={updateImage}
          multiple
        />
      </div>
      <div className="preview-container">
        {Array.from(image.values()).map((img, i) => {
          return (
            <div className="thumbnail-preview" key={i}>
              <img
                className={`preview ${uploading === img.name ? "uploading" : ""}`}
                src={URL.createObjectURL(img)}
                alt="Preview of your uploaded image"
              />
              <button disabled={uploading === img.name} onClick={() => removeStagedUpload(img)}>
                ✕
              </button>
            </div>
          )
        })}
      </div>
    </Dropzone>
  )
})

export default FileInput
