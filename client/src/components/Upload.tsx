import React, { useContext, useLayoutEffect, useRef, useState } from "react"
import AdminArtCollection from "./AdminArtCollection"
import FileInput, { FileWithSrc } from "./form/FileInput"
import ArtworkForm, { TArtworkForm } from "./form/ArtworkForm"
import { ApiContext } from "../context/apiContext"
import "../styles/form.css"

function Upload() {
  const { artworkPending, createArtwork } = useContext(ApiContext)

  const [image, setImage] = useState<Map<string, FileWithSrc>>(new Map())
  const [form, setForm] = useState<TArtworkForm>({})

  const fileInput = useRef<HTMLInputElement>(null)

  useLayoutEffect(() => {
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
      const srcFile: FileWithSrc = file
      srcFile.src ||= URL.createObjectURL(file)
      image.set(file.name, file)
    }
    setImage(new Map(image))
  }

  const uploadNewArt = async (img: File) => {
    const uploadFormData = new FormData()
    Object.entries(form).forEach(([key, value]) => {
      uploadFormData.append(key, value)
    })
    uploadFormData.append("image", img)
    await createArtwork(uploadFormData, img.name)
  }

  const beginBulkUpload = async () => {
    while (image.size > 0) {
      const img = image.values().next().value
      if (!img) continue

      await uploadNewArt(img)
      image.delete(img.name)
    }
    setImage(new Map(image))
  }

  const removeStagedUpload = (img: File) => {
    image.delete(img.name)
    setImage(new Map(image))
  }

  return (
    <>
      <div className="form-data">
        <ArtworkForm form={form} setForm={setForm} />
        <FileInput
          ref={fileInput}
          image={image}
          updateImage={updateImage}
          uploading={artworkPending}
          removeStagedUpload={removeStagedUpload}
        />
        {form.category && form.subCategory && image.size ? (
          <button onClick={void beginBulkUpload} disabled={!!artworkPending}>
            {artworkPending ? "Uploading..." : "Upload"}
          </button>
        ) : null}
      </div>
      {form.category && form.subCategory ? (
        <AdminArtCollection
          // form={form}
          // setForm={setForm}
          category={form.category}
          subCategory={form.subCategory}
        />
      ) : null}
    </>
  )
}

export default Upload
