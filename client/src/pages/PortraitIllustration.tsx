import { michellePainting } from "../assets/images/portrait-illustration"

function PortraitIllustration() {
  return (
    <div className="hero-image-container">
      <img className="hero-image" src={michellePainting.large} alt="Kayla Kossajda" />
      <div className="hero-text glass">
        <h1>Portrait Illustration</h1>
      </div>
    </div>
  )
}

export default PortraitIllustration
