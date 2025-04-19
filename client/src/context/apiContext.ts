import { createContext } from "react"
import { TArtworkApi } from "../hooks/api/useArtworkApi"
import { TProductApi } from "../hooks/api/useProductApi"
import { TArticleApi } from "../hooks/api/userArticleApi"

type TApiContext = TArtworkApi & TProductApi & TArticleApi

export const ApiContext = createContext<TApiContext>({} as TApiContext)
