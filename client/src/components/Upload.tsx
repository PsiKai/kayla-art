import React, { useEffect, useRef, useState } from "react"
import AdminArtCollection from "./AdminArtCollection"
import FileInput from "./form/FileInput"
import ArtworkForm, { TArtworkForm } from "./form/ArtworkForm"

function Upload() {
  const [image, setImage] = useState<Map<string, File>>(new Map())
  const [form, setForm] = useState<TArtworkForm>({})
  const [uploading, setUploading] = useState<File | null>(null)

  const uploadForm = useRef<HTMLFormElement>(null)
  const fileInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (image.size === 0) {
      fileInput.current!.value = ""
    }
    const dt = new DataTransfer()
    Array.from(image.values()).forEach(file => dt.items.add(file))
    fileInput.current!.files = dt.files
  }, [image])

  const updateImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    for (const file of e.target.files) {
      image.set(file.name, file)
    }
    setImage(new Map(image))
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
    } catch (error) {
      console.error("Failed to upload artwork")
      console.error(error)
    } finally {
      setImage(new Map(image))
    }
  }

  const removeStagedUpload = (img: File) => {
    image.delete(img.name)
    setImage(new Map(image))
  }

  return (
    <>
      <div className="form-data">
        <h2>Make Changes To Your Artwork</h2>
        <ArtworkForm ref={uploadForm} form={form} setForm={setForm} />
        <FileInput
          ref={fileInput}
          image={image}
          updateImage={updateImage}
          uploading={uploading}
          removeStagedUpload={removeStagedUpload}
        />
        {form.category && form.subCategory && form.artCollection && image.size ? (
          <button onClick={beginBulkUpload} disabled={uploading !== null}>
            {uploading !== null ? "Uploading..." : "Upload"}
          </button>
        ) : null}
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
