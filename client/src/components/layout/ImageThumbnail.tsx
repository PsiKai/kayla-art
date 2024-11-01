import { TArtWork } from "../../context/AppContext"

type TImageThumbnailProps = {
  image: TArtWork
}

function ImageThumbnail(props: TImageThumbnailProps) {
  const { image } = props
  return (
    <div>
      <img style={{ maxWidth: "100%" }} src={image.thumbnail} alt={image.artCollection} />
    </div>
  )
}

export default ImageThumbnail
