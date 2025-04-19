import React from "react"
import { titleCase } from "../../utils/stringUtils"

export type TGenericSelectionProps = {
  allValues: string[]
  selectedValue: string
  valueType: string
  updateForm: React.ChangeEventHandler<HTMLSelectElement | HTMLInputElement>
  withInput?: boolean
  disabled?: boolean
}

function GenericSelection({
  allValues,
  selectedValue,
  updateForm,
  valueType,
  disabled,
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
      <select
        name={valueType}
        id="subCategory"
        value={selectedValue}
        onChange={updateForm}
        disabled={disabled}
      >
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
          disabled={disabled}
        />
      ) : null}
    </div>
  )
}

export default GenericSelection
