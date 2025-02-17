import { umbrellaBoat } from "../assets/images/creative-illustration"

function CreativeIllustration() {
  return (
    <div className="hero-image-container">
      <img className="hero-image" src={umbrellaBoat.large} alt="Kayla Kossajda" />
      <div className="glass hero-text">
        <h1>Creative Illustration</h1>
      </div>
    </div>
  )
}

export default CreativeIllustration
