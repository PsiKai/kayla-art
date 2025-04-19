import React, { useCallback, useState } from "react"
import { TProductForm } from "../../components/form/ProductForm"
import { TAppDispatch, TProduct } from "../../core-types"

export type TProductApi = {
  productPending: string
  productError: string
  createProduct: (_productForm: TProductForm) => Promise<TProduct[] | void>
  updateProduct: (_values: TProductForm) => Promise<TProduct[] | void>
  deleteProduct: (_id: string) => Promise<void>
}

export const useProductApi = (dispatch: React.Dispatch<TAppDispatch>) => {
  const [productPending, setPending] = useState<string>("")
  const [productError, setError] = useState<string>("")

  const createProduct = useCallback(
    async (productForm: TProductForm) => {
      setPending(productForm.serviceName)

      try {
        const res = await fetch("/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productForm),
        })

        if (!res.ok) {
          throw new Error(`Failed to upload product: ${await res.text()}`)
        }

        const { data } = (await res.json()) as { data: TProduct }
        dispatch({ type: "ADD_PRODUCT", payload: data })
      } catch (err) {
        console.error(err)
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError("An unknown error occurred while uploading product")
        }
      } finally {
        setPending("")
      }
    },
    [dispatch],
  )

  const updateProduct = useCallback(
    async (values: TProductForm) => {
      setPending(values?._id ? values._id : values.serviceName)
      try {
        const response = await fetch(`/api/products/${values._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        })

        if (!response.ok) {
          throw new Error(`Failed to update product: ${await response.text()}`)
        }

        const { data } = (await response.json()) as { data: TProduct }
        dispatch({ type: "UPDATE_PRODUCT", payload: data })
      } catch (error) {
        console.error(error)

        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError("An unknown error occurred while updating product")
        }
      } finally {
        setPending("")
      }
    },
    [dispatch],
  )

  const deleteProduct = useCallback(
    async (_id: string) => {
      setPending(_id)
      try {
        const response = await fetch(`/api/products/${_id}`, {
          method: "DELETE",
        })

        if (!response.ok) {
          throw new Error(`Failed to delete product: ${await response.text()}`)
        }

        dispatch({ type: "DELETE_PRODUCT", payload: _id })
      } catch (error) {
        console.error(error)

        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError("An unknown error occurred while deleting product")
        }
      }
    },
    [dispatch],
  )

  return { productPending, productError, createProduct, updateProduct, deleteProduct }
}
