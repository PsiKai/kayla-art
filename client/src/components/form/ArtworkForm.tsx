import { ChangeEvent, Dispatch, FC, SetStateAction } from "react"
import { titleCase } from "../../utils/stringUtils"
import { TArtworkRoles } from "../../core-types"

export type TArtworkForm = {
  category?: string
  subCategory?: string
  artCollection?: string
  role?: TArtworkRoles
}

type TArtworkFormProps = {
  form: TArtworkForm
  setForm: Dispatch<SetStateAction<TArtworkForm>>
}

const subCategoriesMap: Record<string, string[]> = {
  photography: ["portraits", "pets", "creative"],
  illustration: ["portraits", "creative"],
}

const ArtworkForm: FC<TArtworkFormProps> = props => {
  const { form, setForm } = props

  const updateForm = (e: ChangeEvent<HTMLInputElement>) => {
    const [category, subCategory] = e.target.value.split("/")
    setForm(prev => {
      const updatedForm = {
        ...prev,
        category,
        subCategory: subCategory || prev.subCategory,
      }
      return updatedForm
    })
  }

  return (
    <form className="form">
      {Object.entries(subCategoriesMap).map(([category, subCategories]) => (
        <div key={category}>
          <label>
            <h3>{titleCase(category)}</h3>
            <input
              type="radio"
              name="category"
              value={category}
              checked={form.category === category}
              onChange={updateForm}
              hidden
            />
          </label>
          {subCategories.map(subCategory => (
            <label key={`${category}/${subCategory}`}>
              <input
                type="radio"
                name="subCategory"
                value={`${category}/${subCategory}`}
                checked={form.category === category && form.subCategory === subCategory}
                onChange={updateForm}
              />
              {subCategory}
            </label>
          ))}
        </div>
      ))}
    </form>
  )
}

export default ArtworkForm
