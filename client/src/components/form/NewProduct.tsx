import React, { useCallback, useContext, useState } from "react"
import ProductForm from "./ProductForm"
import { baseForm } from "./form-utils"
import { ApiContext } from "../../context/apiContext"

function NewProduct() {
  const { createProduct, productPending } = useContext(ApiContext)
  const [form, setForm] = useState(baseForm)

  const submitNewProduct = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      await createProduct(form)
      setForm(baseForm)
    },
    [createProduct, form],
  )

  return (
    <>
      <h4>New Product</h4>
      <ProductForm
        id="newProductForm"
        form={form}
        setForm={setForm}
        onSubmit={e => void submitNewProduct(e)}
      />
      <button form="newProductForm" disabled={!!productPending}>
        Add Product
      </button>
    </>
  )
}

export default NewProduct
