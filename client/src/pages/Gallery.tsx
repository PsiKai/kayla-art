import heroSample2 from "../assets/images/main-page/sampleherok2.png"
import ImageTimeline from "../components/layout/ImageTimeline"

function Gallery() {
  return (
    <div>
      <div className="hero-image-container">
        <img className="hero-image" src={heroSample2} alt="Kayla Kossajda" />
        <div className="glass hero-text">
          <h1>Gallery</h1>
        </div>
      </div>
      <ImageTimeline />
    </div>
  )
}

export default Gallery
