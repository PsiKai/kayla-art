import { TArtWork } from "../../context/AppContext"
import { Link } from "react-router-dom"
import { titleCase } from "../../utils/stringUtils"

type TGridImagesProps = {
  artworks: TArtWork[]
}

function GridImages(props: TGridImagesProps) {
  const { artworks } = props

  return artworks.map(art => (
    <Link to={art._id} key={art._id}>
      <img
        src={art.thumbnail}
        alt={`An artwork from the ${titleCase(art.artCollection)} collection`}
      />
    </Link>
  ))
}

export default GridImages
