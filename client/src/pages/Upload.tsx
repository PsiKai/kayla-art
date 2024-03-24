import React, { useState /*, useContext*/ } from "react"
// import { AppContext } from "../context/AppContext"

type TUploadForm = {
  category?: string
  subcategory?: string
  collection?: string
}

function Upload() {
  // const { dispatch } = useContext(AppContext)
  const [image, setImage] = useState<File | null>()
  const [form, setForm] = useState<TUploadForm>({})
  const [uploading, setUploading] = useState(false)

  const updateImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const [imgFile] = e.target.files
    if (imgFile) {
      setImage(imgFile)
    } else {
      setImage(null)
      setForm({})
    }
  }

  const updateForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    })
  }

  const uploadNewArt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const uploadForm = new FormData(e.currentTarget)
    const imageField = uploadForm.get("image")!
    uploadForm.delete("image")
    uploadForm.append("image", imageField)

    setUploading(true)
    try {
      const res = await fetch("/api/artworks", {
        method: "POST",
        body: uploadForm,
      })
      const { newArt } = await res.json()
      console.log(newArt)
      // dispatch({ type: "ADD_ARTWORK", payload: newArt })
      e.currentTarget.reset()
      setForm({})
      setImage(null)
    } catch (err) {
      console.log(err)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="form-data">
      <h1>Upload Artwork</h1>
      {image && typeof image !== "string" && (
        <img
          className="preview"
          src={URL.createObjectURL(image)}
          alt="Preview of your uploaded image"
          style={{ width: "200px" }}
        />
      )}
      <form className="form" onSubmit={uploadNewArt}>
        <div>
          <legend>
            <label htmlFor="image">
              <p>
                <strong>Image</strong>
              </p>
            </label>
          </legend>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            required
            onChange={updateImage}
          />
        </div>
        <div>
          <legend>
            <label htmlFor="category">
              <p>
                <strong>Category</strong>
              </p>
            </label>
          </legend>
          <input
            id="category"
            type="text"
            name="category"
            placeholder="Category"
            required
            autoComplete="off"
            spellCheck="false"
            value={form.category || ""}
            onChange={updateForm}
          />
        </div>
        <div>
          <legend>
            <label htmlFor="subcategory">
              <p>
                <strong>Subcategory</strong>
              </p>
            </label>
          </legend>
          <input
            id="subcategory"
            type="text"
            name="subcategory"
            placeholder="Subcategory"
            required
            autoComplete="off"
            spellCheck="false"
            value={form.subcategory || ""}
            onChange={updateForm}
          />
        </div>
        <div>
          <legend>
            <label htmlFor="collection">
              <p>
                <strong>Collection</strong>
              </p>
            </label>
          </legend>
          <input
            id="collection"
            type="text"
            name="collection"
            placeholder="Collection"
            required
            autoComplete="off"
            spellCheck="false"
            value={form.collection || ""}
            onChange={updateForm}
          />
        </div>
        <button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  )
}

export default Upload
