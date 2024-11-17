import { titleCase } from "../../utils/stringUtils"

type TGenericSelectionProps = {
  allValues: string[]
  selectedValue: string
  valueType: string
  updateForm: React.ChangeEventHandler<HTMLSelectElement | HTMLInputElement>
  withInput?: boolean
}

function GenericSelection({
  allValues,
  selectedValue,
  updateForm,
  valueType,
  withInput = false,
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

      {withInput ? (
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
      ) : null}
    </div>
  )
}

export default GenericSelection
