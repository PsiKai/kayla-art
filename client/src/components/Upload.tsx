import React, { Dispatch, useEffect, useRef, useState } from "react"
import AdminArtCollection from "./AdminArtCollection"
import CategoriesSelection from "./form/CategoriesSelection"
import GenericSelection from "./form/GenericSelection"
import FileInput from "./form/FileInput"
import { slugify } from "../utils/stringUtils"
import useDebounce from "../hooks/useDebounce"

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
  const fileInput = useRef<HTMLInputElement>(null)

  const debounce = useDebounce(500)

  useEffect(() => {
    if (image.size === 0) {
      fileInput.current!.value = ""
    }

    const dt = new DataTransfer()
    Array.from(image.values()).forEach(file => dt.items.add(file))
    fileInput.current!.files = dt.files
  }, [image])

  const updateFormSelections = async (
    updatedForm: TUploadForm,
    updatedField: keyof TUploadForm,
  ) => {
    if (!updatedForm.category) return
    if (!updatedForm[updatedField]) return

    type mapType<T> = {
      [key in keyof TUploadForm]: T
    }
    const urlMap: mapType<string> = {
      category: `/api/artworks/categories/${updatedForm.category}/subcategories`,
      subCategory: `/api/artworks/categories/${updatedForm.category}/subcategories/${updatedForm.subCategory}/collections`,
    }
    const stateSetterMap: mapType<Dispatch<React.SetStateAction<string[]>>> = {
      category: setSubCategories,
      subCategory: setCollections,
    }

    const url = urlMap[updatedField]
    const stateSetter = stateSetterMap[updatedField]
    if (!url || !stateSetter) return

    stateSetter([])
    fetch(url)
      .then(res => res.json())
      .then(({ resources }) => stateSetter(resources))
      .catch(err => console.log(err))
  }

  const updateImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    for (const file of e.target.files) {
      image.set(file.name, file)
    }
    setImage(new Map(image))
  }

  const updateForm = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let value = e.target.value.replace(invalidCharsRegex, "")
    value = slugify(value)
    console.log(value)
    setForm(prev => {
      const updatedForm = {
        ...prev,
        [e.target.name]: value,
      }

      debounce(() => updateFormSelections(updatedForm, e.target.name as keyof TUploadForm))
      return updatedForm
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
        <h2>Upload Artwork</h2>
        <form ref={uploadForm} className="form">
          <CategoriesSelection category={form.category || ""} updateForm={updateForm} />
          <GenericSelection
            allValues={subCategories}
            valueType="subCategory"
            selectedValue={form.subCategory || ""}
            updateForm={updateForm}
          />
          <GenericSelection
            allValues={collections}
            valueType="artCollection"
            selectedValue={form.artCollection || ""}
            updateForm={updateForm}
          />
        </form>
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
