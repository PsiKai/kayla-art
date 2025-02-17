import { jadaSunny } from "../assets/images/pet-photography"

function PetPhotography() {
  return (
    <div>
      <div className="hero-image-container">
        <img className="hero-image" src={jadaSunny.large} alt="Kayla Kossajda" />
        <div className="glass hero-text">
          <h1>Pet Photography</h1>
        </div>
      </div>
    </div>
  )
}

export default PetPhotography
