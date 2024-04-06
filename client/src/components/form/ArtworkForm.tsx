import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react"
import CategoriesSelection from "./CategoriesSelection"
import GenericSelection from "./GenericSelection"
import { slugify } from "../../utils/stringUtils"
import useDebounce from "../../hooks/useDebounce"

export type TArtworkForm = {
  category?: string
  subCategory?: string
  artCollection?: string
}

type TArtworkFormProps = {
  form: TArtworkForm
  setForm: Dispatch<SetStateAction<TArtworkForm>>
  formRef: React.RefObject<HTMLFormElement>
}

type TMapType<T> = {
  [key in keyof TArtworkForm]: T
}

const invalidCharsRegex = /[!"#$%&'()*+,/:;<=>?@[\\\]^`{|}~]/g

const ArtworkForm: FC<TArtworkFormProps> = props => {
  const { form, setForm, formRef } = props

  const [subCategories, setSubCategories] = useState<string[]>([])
  const [collections, setCollections] = useState<string[]>([])

  const debounce = useDebounce(500)

  const updateFormSelections = (updatedForm: TArtworkForm, updatedField: keyof TArtworkForm) => {
    if (!updatedForm.category) return
    if (!updatedForm[updatedField]) return

    const urlMap: TMapType<string> = {
      category: `/api/artworks/categories/${updatedForm.category}/subcategories`,
      subCategory: `/api/artworks/categories/${updatedForm.category}/subcategories/${updatedForm.subCategory}/collections`,
    }
    const stateSetterMap: TMapType<Dispatch<SetStateAction<string[]>>> = {
      category: setSubCategories,
      subCategory: setCollections,
    }

    const url = urlMap[updatedField]
    const stateSetter = stateSetterMap[updatedField]
    if (!url || !stateSetter) return

    setCollections([])
    stateSetter([])
    fetch(url)
      .then(res => res.json())
      .then(({ resources }) => stateSetter(resources))
      .catch(err => console.log(err))
  }

  const updateForm = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let value = e.target.value.replace(invalidCharsRegex, "")
    value = slugify(value)

    setForm(prev => {
      const updatedForm = {
        ...prev,
        ...(e.target.name === "category" ? { subCategory: "", artCollection: "" } : {}),
        ...(e.target.name === "subCategory" ? { artCollection: "" } : {}),
        [e.target.name]: value,
      }

      debounce(() => updateFormSelections(updatedForm, e.target.name as keyof TArtworkForm))
      return updatedForm
    })
  }

  return (
    <form ref={formRef} className="form">
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
  )
}

export default ArtworkForm
