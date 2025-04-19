import { useCallback, useContext, useEffect, useMemo, useState } from "react"
import useFetchOnRender from "../../hooks/useFetchOnRender"
import Loading from "./Loading"
import UpdateProductModal from "../UpdateProductModal"
import { TProductForm } from "../form/ProductForm"
import { AppContext } from "../../context/appContext"
import { ApiContext } from "../../context/apiContext"
import { TProduct } from "../../core-types"
import DeleteProductModal from "../DeleteProductModal"

const AdminProducts = () => {
  const {
    dispatch,
    state: { products },
  } = useContext(AppContext)
  const { updateProduct, deleteProduct } = useContext(ApiContext)
  const [openModal, setOpenModal] = useState<"update" | "delete" | null>(null)
  const [currentProduct, setCurrentProduct] = useState<string | null>(null)

  const [fetchedProducts, pending] = useFetchOnRender<TProduct[]>("/api/products")

  const handleFinish = useCallback(() => {
    setOpenModal(null)
    setCurrentProduct(null)
  }, [])

  const submitProductUpdates = useCallback(
    async (product: TProductForm) => {
      await updateProduct(product)
      handleFinish()
    },
    [updateProduct, handleFinish],
  )

  const submitProductDelete = useCallback(
    async (id: string) => {
      await deleteProduct(id)
      handleFinish()
    },
    [deleteProduct, handleFinish],
  )

  const setEditing = useCallback((id: string) => {
    setOpenModal("update")
    setCurrentProduct(id)
  }, [])

  const setDeleting = useCallback((id: string) => {
    setOpenModal("delete")
    setCurrentProduct(id)
  }, [])

  const selectedProduct = useMemo(
    () => products.find(product => product._id === currentProduct),
    [currentProduct, products],
  )

  useEffect(() => {
    if (pending) return

    dispatch({ type: "SET_PRODUCTS", payload: fetchedProducts })
  }, [fetchedProducts, pending, dispatch])

  if (pending) return <Loading />
  return (
    <>
      <h4>Products</h4>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            <h3>{product.category}</h3>
            <h4>{product.serviceName}</h4>
            <p>{product.price}</p>
            <p>{product.size}</p>
            <p>{product.description}</p>
            <button onClick={() => setEditing(product._id)}>Edit</button>
            <button onClick={() => setDeleting(product._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <UpdateProductModal
        open={!!selectedProduct && openModal === "update"}
        handleExit={handleFinish}
        product={selectedProduct!}
        onSubmit={submitProductUpdates}
      />
      <DeleteProductModal
        open={!!selectedProduct && openModal === "delete"}
        handleExit={handleFinish}
        product={selectedProduct!}
        onSubmit={submitProductDelete}
      />
    </>
  )
}

export default AdminProducts
