import { createContext, useContext } from "react"
import { AppContext } from "./AppContext"
import { TArtworkApi, useArtworkApi } from "../hooks/api/useArtworkApi"
import { TProductApi, useProductApi } from "../hooks/api/useProductApi"

type TApiContext = TArtworkApi & TProductApi

export const ApiContext = createContext<TApiContext>({} as TApiContext)

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
