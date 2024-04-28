import heroSample1 from "../assets/images/main-page/samplehero1.jpg"

function Creative() {
  return (
    <div className="hero-image-container">
      <img className="hero-image" src={heroSample1} alt="Kayla Kossajda" />
      <div className="hero-text">
        <h1>Creative Photography</h1>
      </div>
    </div>
  )
}

export default Creative