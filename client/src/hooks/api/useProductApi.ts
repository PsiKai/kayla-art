import { useCallback, useState } from "react"
import { TDispatch, TProduct } from "../../context/AppContext"
import { TProductForm } from "../../components/form/NewProduct"

export const useProductApi = (dispatch: React.Dispatch<TDispatch>) => {
  const [productPending, setPending] = useState<string>("")
  const [productError, setError] = useState<string>("")

  const createProduct = useCallback(
    async (productForm: TProductForm) => {
      setPending(productForm.serviceName)

      try {
        const res = await fetch("/api/products", {
          method: "POST",
          body: JSON.stringify(productForm),
        })

        if (!res.ok) {
          throw new Error(`Failed to upload product: ${await res.text()}`)
        }

        const { data } = await res.json()
        return data as TProduct[]
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
    async (values: TProduct) => {
      setPending(values._id)
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

        const { data } = await response.json()
        return data as TProduct[]
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
    (_id: string) => {
      setPending(_id)
      try {
        fetch(`/api/products/${_id}`, {
          method: "DELETE",
        })
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
