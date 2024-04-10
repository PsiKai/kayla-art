import ImageTimeline from "../components/layout/ImageTimeline"
import heroSample1 from "../assets/images/main-page/samplehero1.jpg"

function Pets() {
  return (
    <div>
      <div className="hero-image-container">
        <img className="hero-image" src={heroSample1} alt="Kayla Kossajda" />
        <div className="hero-text">
          <h1>Pets</h1>
        </div>
      </div>
      <ImageTimeline category="photography" subCategory="pets" />
    </div>
  )
}

export default Pets
