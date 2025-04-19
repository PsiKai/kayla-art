import React, { createContext } from "react"
import { TAppDispatch, TAppState } from "../core-types"

type TProvider = {
  state: TAppState
  dispatch: React.Dispatch<TAppDispatch>
}

export const initialAppState: TAppState = {
  art: [],
  products: [],
}

const initialAppContext = { state: initialAppState, dispatch: () => {} }
export const AppContext = createContext<TProvider>(initialAppContext)
