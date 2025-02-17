import { TArtWork } from "../../context/AppContext"

type TImageThumbnailProps = {
  image: TArtWork
}

function ImageThumbnail(props: TImageThumbnailProps) {
  const { image } = props
  return (
    <div>
      <img
        style={{ maxWidth: "100%" }}
        src={image.thumbnails["375"]}
        alt={`An image from the ${image.subCategory} album`}
      />
    </div>
  )
}

export default ImageThumbnail
