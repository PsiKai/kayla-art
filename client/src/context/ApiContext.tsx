import { createContext, useContext } from "react"
import { AppContext } from "./AppContext"
import { TArtworkForm } from "../components/form/ArtworkForm"
import { useArtworkApi } from "../hooks/api/useArtworkApi"
import { useProductApi } from "../hooks/api/useProductApi"

type TApiContext = {
  artworkPending: string
  artworkError: string
  createArtwork: (form: FormData, artworkName: string) => Promise<void>
  updateArtwork: (values: TArtworkForm, _id: string) => Promise<void>
  deleteArtwork: (_id: string) => Promise<void>
}

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
