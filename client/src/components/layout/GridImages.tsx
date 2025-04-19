import { Link } from "react-router-dom"
import { titleCase } from "../../utils/stringUtils"
import { TArtWork } from "../../core-types"

type TGridImagesProps = {
  artworks: TArtWork[]
}

function GridImages(props: TGridImagesProps) {
  const { artworks } = props

  return artworks.map(art => (
    <Link to={art._id} key={art._id}>
      <img
        src={art.thumbnails.small}
        alt={`An artwork from the ${titleCase(art.artCollection)} collection`}
      />
    </Link>
  ))
}

export default GridImages
