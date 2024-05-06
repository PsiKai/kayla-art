import { yorkieJada } from "../assets/images/about-me"
import ImageTimeline from "../components/layout/ImageTimeline"

function PhotographyGallery() {
  return (
    <div>
      <div className="hero-image-container">
        <img className="hero-image" src={yorkieJada.width1440} alt="Kayla Kossajda" />
        <div className="glass hero-text">
          <h1>Photography Gallery</h1>
        </div>
      </div>
      <ImageTimeline />
    </div>
  )
}

export default PhotographyGallery
