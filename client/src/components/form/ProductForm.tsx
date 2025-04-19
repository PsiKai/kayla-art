import React, { Dispatch, FC, useCallback } from "react"
import { TProduct } from "../../core-types"

export type TProductForm = Omit<TProduct, "_id" | "category"> & {
  _id?: string
  category: "photography" | "illustration" | ""
}

type TProductFormProps = {
  form: TProductForm
  setForm: Dispatch<React.SetStateAction<TProductForm>>
  id?: string
  onSubmit: React.FormEventHandler<HTMLFormElement>
}

const ProductForm: FC<TProductFormProps> = ({ form, setForm, id, onSubmit }) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setForm(prev => ({ ...prev, [name]: value }))
    },
    [setForm],
  )

  return (
    <form onSubmit={onSubmit} id={id}>
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
            onChange={handleChange}
          />
        </div>
      </fieldset>
    </form>
  )
}

export default ProductForm
