import { useParams } from "react-router-dom"

export default function withValidPath<TProps extends React.ComponentProps<React.ComponentType>>(
  Component: React.ComponentType<TProps>,
) {
  return function Wrapper(props: TProps) {
    const { category } = useParams()

    if (/^photography|illustration$/.test(category!) === false) {
      return <div>Category not found</div>
    }

    return <Component {...props} />
  }
}
