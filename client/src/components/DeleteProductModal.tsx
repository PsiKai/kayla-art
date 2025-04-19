import React, { FC, useCallback } from "react"
import { Modal, TModalProps } from "./layout/Modal"
import { TProduct } from "../core-types"

type TDeleteProductModal = {
  product: TProduct
  onSubmit: (_id: string) => Promise<void>
} & TModalProps

const DeleteProductModal: FC<TDeleteProductModal> = ({
  product = {} as TProduct,
  onSubmit,
  handleExit,
  ...modalProps
}) => {
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      void onSubmit(product._id)
    },
    [onSubmit, product._id],
  )

  return (
    <Modal {...modalProps} handleExit={handleExit}>
      <h2>Delete this Product?</h2>
      <h3>{product.category}</h3>
      <h4>{product.serviceName}</h4>
      <p>{product.price}</p>
      <p>{product.size}</p>
      <p>{product.description}</p>
      <button onClick={handleSubmit}>Confirm Delete</button>
    </Modal>
  )
}

export default DeleteProductModal
