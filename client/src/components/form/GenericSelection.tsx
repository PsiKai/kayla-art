import { titleCase } from "../../utils/stringUtils"

type TGenericSelectionProps = {
  allValues: string[]
  selectedValue: string
  valueType: string
  updateForm: (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void
}

function GenericSelection({
  allValues,
  selectedValue,
  updateForm,
  valueType,
}: TGenericSelectionProps) {
  return (
    <div className="form-field">
      <legend>
        <label htmlFor={valueType}>
          <p>
            <strong>{titleCase(valueType)}</strong>
          </p>
        </label>
      </legend>
      <select name={valueType} id="subCategory" value={selectedValue} onChange={updateForm}>
        <option value="">Select {titleCase(valueType)}</option>
        {allValues.map(value => (
          <option key={value} value={value}>
            {titleCase(value)}
          </option>
        ))}
      </select>

      <input
        id={valueType}
        type="text"
        name={valueType}
        placeholder={titleCase(valueType)}
        required
        autoComplete="off"
        spellCheck="false"
        value={titleCase(selectedValue)}
        onChange={updateForm}
      />
    </div>
  )
}

export default GenericSelection
