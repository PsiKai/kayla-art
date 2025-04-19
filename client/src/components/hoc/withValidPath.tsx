import React from "react"
import { useParams } from "react-router-dom"
import { isValidCategory } from "../../core-types"

export default function withValidPath<TProps extends React.ComponentProps<React.ComponentType>>(
  Component: React.ComponentType<TProps>,
) {
  return function WithValidPath(props: Omit<TProps, "category" | "subCategory">) {
    const { category, subCategory } = useParams()

    if (isValidCategory(category) && subCategory) {
      return <Component {...(props as TProps)} category={category} subCategory={subCategory} />
    }

    return <div>Category not found</div>
  }
}
