import React, { createContext, useReducer } from "react"

export type TArtWork = {
  _id: string
  category: "Photography" | "Illustration"
  artCollection: string
  subCategory: string
  thumbnail: string
  extension?: string
  createdAt?: string | Date
}

type TAppState = {
  user: string | null
  art: TArtWork[]
}

type Props = {
  children: React.ReactNode | React.ReactNode[]
}

type TProvider = {
  state: TAppState
  dispatch: React.Dispatch<{ type: string; payload: Partial<TAppState> }>
}

const initialAppState: TAppState = {
  user: null,
  art: [],
}

const initialAppContext: TProvider = { state: initialAppState, dispatch: () => {} }

export const AppContext = createContext(initialAppContext)

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialAppState)

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

function appReducer(
  state: TAppState,
  action: { type: string; payload: Partial<TAppState> },
): TAppState {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload.user! }
    case "SET_ART":
      return { ...state, art: action.payload.art! }
    default:
      return state
  }
}
