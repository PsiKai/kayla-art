import { useParams } from "react-router-dom"
import { isValidCategory } from "../../context/AppContext"

export default function withValidPath<TProps extends React.ComponentProps<React.ComponentType>>(
  Component: React.ComponentType<TProps>,
) {
  return function WithValidPath(props: TProps) {
    const { category, subCategory } = useParams()

    if (isValidCategory(category) && subCategory) {
      return <Component {...props} category={category} subCategory={subCategory} />
    }

    return <div>Category not found</div>
  }
}
