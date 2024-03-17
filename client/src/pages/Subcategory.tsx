import { Link, useParams } from "react-router-dom"

function Subcategory() {
  const { subcategory } = useParams()
  return (
    <>
      <div>Subcategory: {subcategory}</div>
      <Link to="sample-collection">Sample Collection</Link>
      <Link to="another-collection">Another Collection</Link>
    </>
  )
}

export default Subcategory
