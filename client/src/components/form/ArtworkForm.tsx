import { ChangeEvent, Dispatch, FC, SetStateAction } from "react"
import CategoriesSelection from "./CategoriesSelection"
import GenericSelection from "./GenericSelection"
import { TArtworkRoles } from "../../context/AppContext"
// import { slugify } from "../../utils/stringUtils"
// import useDebounce from "../../hooks/useDebounce"

export type TArtworkForm = {
  category?: string
  subCategory?: string
  artCollection?: string
  role?: TArtworkRoles
}

type TArtworkFormProps = {
  form: TArtworkForm
  setForm: Dispatch<SetStateAction<TArtworkForm>>
  formRef?: React.RefObject<HTMLFormElement>
}

// type TMapType<T> = {
//   [key in keyof TArtworkForm]: T
// }

// const invalidCharsRegex = /[!"#$%&'()*+,/:;<=>?@[\\\]^`{|}~]/g

const subCategoriesMap: Record<string, string[]> = {
  photography: ["portraits", "pets", "creative"],
  illustration: ["portraits", "creative"],
}

const ArtworkForm: FC<TArtworkFormProps> = props => {
  const { form, setForm, formRef } = props

  // const [subCategories, setSubCategories] = useState<string[]>([])
  // const [collections, setCollections] = useState<string[]>([])

  // const debounce = useDebounce(500)
  //
  // const updateFormSelections = (updatedForm: TArtworkForm, updatedField: keyof TArtworkForm) => {
  //   if (!updatedForm.category) return
  //   if (!updatedForm[updatedField]) return
  //
  //   const urlMap: TMapType<string> = {
  //     category: `/api/artworks/categories/${updatedForm.category}/subcategories`,
  //     // subCategory: `/api/artworks/categories/${updatedForm.category}/subcategories/${updatedForm.subCategory}/collections`,
  //   }
  //   // const stateSetterMap: TMapType<Dispatch<SetStateAction<string[]>>> = {
  //   //   category: setSubCategories,
  //   //   subCategory: setCollections,
  //   // }
  //
  //   const url = urlMap[updatedField]
  //   if (!url) return
  //   // const stateSetter = stateSetterMap[updatedField]
  //   // if (!url || !stateSetter) return
  //
  //   // setCollections([])
  //   // stateSetter([])
  //   setSubCategories([])
  //   fetch(url)
  //     .then(res => res.json())
  //     .then(({ resources }) => setSubCategories(resources))
  //     .catch(err => console.log(err))
  // }

  const updateForm = (e: ChangeEvent<HTMLSelectElement>) => {
    setForm(prev => {
      const updatedForm = {
        ...prev,
        ...(e.target.name === "category"
          ? { subCategories: subCategoriesMap[e.target.value] }
          : {}),
        [e.target.name]: e.target.value,
      }
      return updatedForm
    })
  }

  return (
    <form ref={formRef} className="form">
      <CategoriesSelection category={form.category || ""} updateForm={updateForm} />
      <GenericSelection
        allValues={subCategoriesMap[form.category || ""] || []}
        valueType="subCategory"
        selectedValue={form.subCategory || ""}
        updateForm={updateForm}
      />
    </form>
  )
}

export default ArtworkForm
