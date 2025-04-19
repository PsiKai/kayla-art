import React, { useReducer } from "react"
import { AppContext, initialAppState } from "./appContext"
import { TAppDispatch, TAppState } from "../core-types"

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialAppState)

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

const appReducer = (state: TAppState, action: TAppDispatch): TAppState => {
  switch (action.type) {
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
