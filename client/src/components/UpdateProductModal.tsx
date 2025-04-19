import React, { FC, useCallback, useEffect, useState } from "react"
import { Modal, TModalProps } from "./layout/Modal"
import ProductForm, { TProductForm } from "./form/ProductForm"

type TUpdateProductModal = {
  product: TProductForm
  onSubmit: (_product: TProductForm) => Promise<void>
} & TModalProps

const UpdateProductModal: FC<TUpdateProductModal> = ({
  product,
  onSubmit,
  handleExit,
  ...modalProps
}) => {
  const [form, setForm] = useState<TProductForm>({ ...product })

  useEffect(() => {
    setForm({ ...product })
  }, [product])

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      void onSubmit(form)
    },
    [onSubmit, form],
  )

  return (
    <Modal {...modalProps} handleExit={handleExit}>
      <h2>Update this Product</h2>
      <ProductForm id="updateProductForm" form={form} setForm={setForm} onSubmit={handleSubmit} />
      <button form="updateProductForm">Submit Updates</button>
    </Modal>
  )
}

export default UpdateProductModal
