import React, { useContext } from "react"
import { useArtworkApi } from "../hooks/api/useArtworkApi"
import { useProductApi } from "../hooks/api/useProductApi"
import { ApiContext } from "./apiContext"
import { AppContext } from "./appContext"

export function ApiProvider({ children }: { children: React.ReactNode }) {
  const { dispatch } = useContext(AppContext)
  const { artworkPending, artworkError, createArtwork, updateArtwork, deleteArtwork } =
    useArtworkApi(dispatch)
  const { productPending, productError, createProduct, updateProduct, deleteProduct } =
    useProductApi(dispatch)

  const value = {
    artworkPending,
    artworkError,
    createArtwork,
    updateArtwork,
    deleteArtwork,
    productPending,
    productError,
    createProduct,
    updateProduct,
    deleteProduct,
  }

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>
}
