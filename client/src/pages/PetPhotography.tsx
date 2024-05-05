import heroSample1 from "../assets/images/main-page/samplehero1.jpg"

function PetPhotography() {
  return (
    <div>
      <div className="hero-image-container">
        <img className="hero-image" src={heroSample1} alt="Kayla Kossajda" />
        <div className="glass hero-text">
          <h1>Pet Photography</h1>
        </div>
      </div>
    </div>
  )
}

export default PetPhotography
