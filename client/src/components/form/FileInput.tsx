import { forwardRef } from "react"

type TFileInputProps = {
  image: Map<string, File>
  updateImage: (event: React.ChangeEvent<HTMLInputElement>) => void
  uploading: string | null
  removeStagedUpload: (file: File) => void
}

const FileInput = forwardRef<HTMLInputElement, TFileInputProps>((props, ref) => {
  const { image, updateImage, uploading, removeStagedUpload } = props
  return (
    <>
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
    </>
  )
})

export default FileInput
