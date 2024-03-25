import { useMemo } from "react"
import { Link, useParams } from "react-router-dom"
import "../../styles/breadcrumb.css"

export default function withBreadcrumbs<TProps extends React.ComponentProps<React.ComponentType>>(
  Component: React.ComponentType<TProps>,
) {
  return function WithBreadCrumbs(props: TProps) {
    const params = useParams()

    const breadcrumbs = useMemo(() => {
      const paths = Object.values(params)
      if (paths.length === 0) return []

      return paths.reduce((trail, crumb, i) => {
        const newPath = "/" + paths.slice(0, i + 1).join("/")
        const link = (
          <Link key={crumb} to={newPath} className="breadcrumb-link">
            {crumb}
          </Link>
        )
        const separator = <span key={`separator-${i}`}>/</span>
        trail.push(link, separator)
        return trail
      }, [] as JSX.Element[])
    }, [params])

    return (
      <>
        <nav className="breadcrumb-container">{breadcrumbs}</nav>
        <Component {...props} />
      </>
    )
  }
}
