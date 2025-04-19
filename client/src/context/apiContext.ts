import { createContext } from "react"
import { TArtworkApi } from "../hooks/api/useArtworkApi"
import { TProductApi } from "../hooks/api/useProductApi"

type TApiContext = TArtworkApi & TProductApi

export const ApiContext = createContext<TApiContext>({} as TApiContext)
