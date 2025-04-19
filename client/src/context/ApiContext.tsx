import React, { useContext } from "react"
import { useArtworkApi } from "../hooks/api/useArtworkApi"
import { useProductApi } from "../hooks/api/useProductApi"
import { ApiContext } from "./apiContext"
import { AppContext } from "./appContext"
import { useArticleApi } from "../hooks/api/userArticleApi"

export function ApiProvider({ children }: { children: React.ReactNode }) {
  const { dispatch } = useContext(AppContext)
  const artworkApiMethods = useArtworkApi(dispatch)
  const productApiMethods = useProductApi(dispatch)
  const articleApiMethods = useArticleApi(dispatch)

  const value = {
    ...artworkApiMethods,
    ...productApiMethods,
    ...articleApiMethods,
  }

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>
}
