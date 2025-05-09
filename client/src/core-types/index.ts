export type TProduct = {
  _id: string
  category: "photography" | "illustration"
  price: number | string
  size: string
  serviceName: string
  description: string
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
export const isValidCategory = (arg: unknown): arg is TArtWork["category"] => {
  return ["photography", "illustration"].includes(arg as string)
}

export type TAppState = {
  art: TArtWork[]
  products: TProduct[]
  articles: TArticle[]
}

export type TAppDispatch =
  | { type: "SET_ARTWORKS"; payload: TArtWork[] }
  | { type: "UPDATE_ARTWORK"; payload: TArtWork[] }
  | { type: "DELETE_ARTWORK"; payload: string }
  | { type: "ADD_ARTWORK"; payload: TArtWork }
  | { type: "SET_PRODUCTS"; payload: TProduct[] }
  | { type: "ADD_PRODUCT"; payload: TProduct }
  | { type: "UPDATE_PRODUCT"; payload: TProduct }
  | { type: "DELETE_PRODUCT"; payload: string }
  | { type: "SET_ARTICLES"; payload: TArticle[] }
  | { type: "ADD_ARTICLE"; payload: TArticle }
  | { type: "UPDATE_ARTICLE"; payload: TArticle }
  | { type: "DELETE_ARTICLE"; payload: string }

export type TArticle = {
  _id: string
  title: string
  content: string
  images: TArtWork[]
}
export type TArticleForm = Omit<TArticle, "_id" | "images"> & { _id?: string; images?: TArtWork[] }
