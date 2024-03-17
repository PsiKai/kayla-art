import { useParams } from "react-router-dom"

function Collection() {
  const { collection } = useParams()
  return (
    <>
      <div>Collection: {collection}</div>
    </>
  )
}

export default Collection
