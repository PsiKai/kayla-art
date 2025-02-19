import { TArtWork } from "../context/AppContext"
import useFetchOnRender from "../hooks/useFetchOnRender"
import ImageThumbnail from "./layout/ImageThumbnail"
import Loading from "./layout/Loading"

function Biography() {
  const [biographyArt, bioPending] = useFetchOnRender<TArtWork[]>(
    "/api/artworks/categories/about/subcategories/biography",
  )
  const [biographyText, textPending] =
    useFetchOnRender<{ _id: string; text: string }[]>("/api/articles")

  return (
    <div style={{ position: "relative", minHeight: "100px" }}>
      <h3>Biography</h3>
      {bioPending || textPending ? (
        <Loading />
      ) : (
        <>
          <h4>Photos of my story</h4>
          {biographyArt.map(art => (
            <ImageThumbnail key={art._id} image={art} />
          ))}
          <h4>My story</h4>
          {(biographyText || []).map(text => (
            <p key={text._id}>{text.text}</p>
          ))}
        </>
      )}
    </div>
  )
}

export default Biography
