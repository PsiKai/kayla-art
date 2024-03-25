import React, { useEffect, useRef, useState } from "react"
import { titleCase } from "../utils/stringUtils"
import AdminArtCollection from "./AdminArtCollection"

type TUploadForm = {
  category?: string
  subCategory?: string
  artCollection?: string
}

const invalidCharsRegex = /[!"#$%&'()*+,/:;<=>?@[\\\]^`{|}~]/g

function Upload() {
  const [image, setImage] = useState<Map<string, File>>(new Map())
  const [form, setForm] = useState<TUploadForm>({})
  const [uploading, setUploading] = useState<File | null>(null)
  const [subCategories, setSubCategories] = useState<string[]>([])
  const [collections, setCollections] = useState<string[]>([])

  const uploadForm = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (!form.category) return
    fetch(`/api/artworks/categories/${form.category}/subcategories`)
      .then(res => res.json())
      .then(({ resources }) => setSubCategories(resources))
      .catch(err => console.log(err))
  }, [form.category])

  useEffect(() => {
    if (!form.category || !form.subCategory) return

    fetch(`/api/artworks/categories/${form.category}/subcategories/${form.subCategory}/collections`)
      .then(res => res.json())
      .then(({ resources }) => setCollections(resources))
      .catch(err => console.log(err))
  }, [form.category, form.subCategory])

  const updateImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    for (const file of e.target.files) {
      image.set(file.name, file)
    }
    setImage(new Map(image))
  }

  const updateForm = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.value.replace(invalidCharsRegex, "")
    console.log(value)
    setForm(prev => {
      return {
        ...prev,
        [e.target.name]: value,
      }
    })
  }

  const uploadNewArt = async (img: File) => {
    setUploading(img)

    const uploadFormData = new FormData(uploadForm.current!)
    uploadFormData.append("image", img)

    try {
      const res = await fetch("/api/artworks", {
        method: "POST",
        body: uploadFormData,
      })
      const { newArt } = await res.json()
      console.log(newArt)
    } catch (err) {
      console.log(err)
    } finally {
      setUploading(null)
    }
  }

  const beginBulkUpload = async () => {
    try {
      while (image.size > 0) {
        const img = image.values().next().value
        await uploadNewArt(img)
        image.delete(img.name)
      }
      setImage(new Map(image))
    } catch (error) {
      console.error("Failed to upload artwork")
      console.error(error)
    }
  }

  const removeStagedUpload = (img: File) => {
    image.delete(img.name)
    setImage(new Map(image))
  }

  return (
    <>
      <div className="form-data">
        <h2>Upload Artwork</h2>
        <form ref={uploadForm} className="form">
          <div>
            <legend>
              <label htmlFor="category">
                <p>
                  <strong>Category</strong>
                </p>
              </label>
            </legend>
            <select
              id="category"
              name="category"
              required
              value={form.category || ""}
              onChange={updateForm}
            >
              <option value="">Select a category</option>
              <option value="photography">Photography</option>
              <option value="illustration">Illustration</option>
            </select>
          </div>
          <div>
            <legend>
              <label htmlFor="subCategory">
                <p>
                  <strong>Subcategory</strong>
                </p>
              </label>
            </legend>
            <select
              name="subCategory"
              id="subCategory"
              value={form.subCategory || ""}
              onChange={updateForm}
            >
              <option value="">Select a subcategory</option>
              {subCategories.map(subCategory => (
                <option key={subCategory} value={subCategory}>
                  {titleCase(subCategory)}
                </option>
              ))}
            </select>

            <input
              id="subCategory"
              type="text"
              name="subCategory"
              placeholder="Subcategory"
              required
              autoComplete="off"
              spellCheck="false"
              value={titleCase(form.subCategory) || ""}
              onChange={updateForm}
            />
          </div>
          <div>
            <legend>
              <label htmlFor="artCollection">
                <p>
                  <strong>Collection</strong>
                </p>
              </label>
            </legend>
            <select
              name="artCollection"
              id="artCollection"
              value={form.artCollection || ""}
              onChange={updateForm}
            >
              <option value="">Select a collection</option>
              {collections.map(collection => (
                <option key={collection} value={collection}>
                  {titleCase(collection)}
                </option>
              ))}
            </select>
            <input
              id="artCollection"
              type="text"
              name="artCollection"
              placeholder="Collection"
              required
              autoComplete="off"
              spellCheck="false"
              value={titleCase(form.artCollection) || ""}
              onChange={updateForm}
            />
          </div>
        </form>
        {form.category && form.subCategory && form.artCollection && image.size ? (
          <button onClick={beginBulkUpload} disabled={uploading !== null}>
            {uploading !== null ? "Uploading..." : "Upload"}
          </button>
        ) : null}
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
            multiple
          />
        </div>
        <div className="preview-container">
          {Array.from(image.values()).map((img, i) => {
            return (
              <div className="thumbnail-preview" key={i}>
                <img
                  className={`preview ${uploading === img ? "uploading" : ""}`}
                  src={URL.createObjectURL(img)}
                  alt="Preview of your uploaded image"
                />
                <button disabled={uploading === img} onClick={() => removeStagedUpload(img)}>
                  X
                </button>
              </div>
            )
          })}
        </div>
      </div>
      {form.category && form.subCategory && form.artCollection ? (
        <AdminArtCollection
          category={form.category}
          subCategory={form.subCategory}
          artCollection={form.artCollection}
        />
      ) : null}
    </>
  )
}

export default Upload
