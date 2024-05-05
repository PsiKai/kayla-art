import { michellePainting } from "../assets/images/portrait-illustration"

function PortraitIllustration() {
  return (
    <div className="hero-image-container">
      <img className="hero-image" src={michellePainting.width1440} alt="Kayla Kossajda" />
      <div className="hero-text glass">
        <h1>Portrait Illustration</h1>
      </div>
    </div>
  )
}

export default PortraitIllustration
