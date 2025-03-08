import { useCallback, useState } from "react"

export type TProductForm = {
  _id?: string
  category: "photography" | "illustration" | ""
  serviceName: string
  price: string
  size: string
  description: string
}

function NewProduct() {
  const baseForm: TProductForm = {
    category: "",
    serviceName: "",
    price: "",
    size: "",
    description: "",
  }

  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState(baseForm)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setForm(prev => ({ ...prev, [name]: value }))
    },
    [],
  )

  const submitNewProduct = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setSubmitting(true)
      window.alert(JSON.stringify(form, null, 2))
      setForm(baseForm)
      setSubmitting(false)
    },
    [form],
  )

  return (
    <>
      <h4>New Product</h4>
      <form onSubmit={submitNewProduct}>
        <fieldset>
          <legend>Category</legend>
          <label>
            Photography
            <input
              type="radio"
              name="category"
              value="photography"
              checked={form.category === "photography"}
              onChange={handleChange}
            />
          </label>
          <label>
            Illustration
            <input
              type="radio"
              name="category"
              value="illustration"
              checked={form.category === "illustration"}
              onChange={handleChange}
            />
          </label>
        </fieldset>
        <fieldset>
          <legend>Product Details</legend>
          <div className="form-field-group">
            <label htmlFor="productServiceName">Service Name</label>
            <input
              id="productServiceName"
              type="text"
              placeholder="Service Name"
              name="serviceName"
              value={form.serviceName}
              onChange={handleChange}
            />
          </div>
          <div className="form-field-group">
            <label htmlFor="productPrice">Price</label>
            <input
              id="productPrice"
              type="text"
              placeholder="Price"
              name="price"
              value={form.price}
              onChange={handleChange}
            />
          </div>
          <div className="form-field-group">
            <label htmlFor="productSize">Size</label>
            <input
              id="productSize"
              type="text"
              placeholder="Size"
              name="size"
              value={form.size}
              onChange={handleChange}
            />
          </div>
          <div className="form-field-group">
            <label htmlFor="productDescription">Description</label>
            <textarea
              id="productDescription"
              placeholder="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </div>
        </fieldset>
        <button disabled={submitting}>Add Product</button>
      </form>
    </>
  )
}

export default NewProduct
