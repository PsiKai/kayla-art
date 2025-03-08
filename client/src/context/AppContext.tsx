import React, { createContext, useReducer } from "react"

export type TProduct = {
  _id: string
  category: "photography" | "illustration"
  price: number
  size?: string | null | undefined
  serviceName?: string | null | undefined
  description?: string | null | undefined
}

export type TArtworkRoles = "gallery" | "main" | "hero" | "carousel"
export function isValidRole(role: string): role is TArtworkRoles {
  return ["gallery", "main", "hero", "carousel"].includes(role)
}

export type TArtWork = {
  _id: string
  category: "photography" | "illustration"
  artCollection?: string
  subCategory: string
  extension?: string
  createdAt?: Date
  role: TArtworkRoles
  thumbnails: Record<"small" | "medium" | "large", string>
}
export const isValidCategory = (arg: any): arg is TArtWork["category"] => {
  return ["photography", "illustration"].includes(arg)
}

type TAppState = {
  user: string | null
  art: TArtWork[]
  products: TProduct[]
}

export type TAppDispatch =
  | { type: "SET_USER"; payload: string }
  | { type: "SET_ARTWORK"; payload: TArtWork[] }
  | { type: "UPDATE_ARTWORK"; payload: TArtWork[] }
  | { type: "DELETE_ARTWORK"; payload: string }
  | { type: "ADD_ARTWORK"; payload: TArtWork }
  | { type: "SET_PRODUCTS"; payload: TProduct[] }
  | { type: "ADD_PRODUCT"; payload: TProduct }
  | { type: "UPDATE_PRODUCT"; payload: TProduct }
  | { type: "DELETE_PRODUCT"; payload: string }

type TProvider = {
  state: TAppState
  dispatch: React.Dispatch<TAppDispatch>
}

const initialAppState: TAppState = {
  user: null,
  art: [],
  products: [],
}

const initialAppContext: TProvider = { state: initialAppState, dispatch: () => {} }

export const AppContext = createContext(initialAppContext)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialAppState)

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

const appReducer = (state: TAppState, action: TAppDispatch): TAppState => {
  if (!action.payload) return state

  switch (action.type) {
    // USER ACTIONS
    case "SET_USER":
      return { ...state, user: action.payload }

    // ARTWORK ACTIONS
    case "SET_ARTWORK":
      return { ...state, art: action.payload }
    case "UPDATE_ARTWORK": {
      const updatedArtwork = action.payload
      return {
        ...state,
        art: state.art.map(art => updatedArtwork.find(({ _id }) => _id === art._id) || art),
      }
    }
    case "DELETE_ARTWORK":
      return { ...state, art: state.art.filter(art => art._id !== action.payload) }
    case "ADD_ARTWORK":
      return { ...state, art: [...state.art, action.payload] }

    // PRODUCT ACTIONS
    case "SET_PRODUCTS":
      return { ...state, products: action.payload }
    case "ADD_PRODUCT":
      return { ...state, products: [...state.products, action.payload] }
    case "UPDATE_PRODUCT": {
      const updatedProduct = action.payload
      return {
        ...state,
        products: state.products.map(product =>
          product._id === updatedProduct._id ? updatedProduct : product,
        ),
      }
    }
    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter(product => product._id !== action.payload),
      }

    // DEFAULT
    default:
      return state
  }
}
