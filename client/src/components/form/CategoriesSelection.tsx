type TCategoriesSelectionProps = {
  category: string
  updateForm: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

function CategoriesSelection({ category, updateForm }: TCategoriesSelectionProps) {
  return (
    <div className="form-field">
      <legend>
        <label htmlFor="category">
          <p>
            <strong>Category</strong>
          </p>
        </label>
      </legend>
      <select id="category" name="category" required value={category} onChange={updateForm}>
        <option value="">Select category</option>
        <option value="photography">Photography</option>
        <option value="illustration">Illustration</option>
      </select>
    </div>
  )
}

export default CategoriesSelection
