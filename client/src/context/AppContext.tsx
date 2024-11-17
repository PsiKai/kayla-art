import React, { createContext, useReducer } from "react"

export type TArtWork = {
  _id: string
  category: "Photography" | "Illustration"
  artCollection?: string
  subCategory: string
  thumbnail: string
  extension?: string
  createdAt?: string | Date
  carousel?: boolean
  hero?: boolean
  main?: boolean
}

type TAppState = {
  user: string | null
  art: TArtWork[]
}

type Props = {
  children: React.ReactNode | React.ReactNode[]
}

type TDispatch = {
  type: string
  payload?: Partial<TAppState> | string | TArtWork[] | TArtWork
}

type TProvider = {
  state: TAppState
  dispatch: React.Dispatch<TDispatch>
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

function appReducer(state: TAppState, action: TDispatch): TAppState {
  if (!action.payload) return state

  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload as string }
    case "SET_ARTWORK":
      return { ...state, art: action.payload as TArtWork[] }
    case "DELETE_ARTWORK":
      return { ...state, art: state.art.filter(art => art._id !== action.payload) }
    case "ADD_ARTWORK":
      return { ...state, art: [...state.art, action.payload as TArtWork] }
    default:
      return state
  }
}
