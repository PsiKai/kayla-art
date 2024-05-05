import { davidFallLeaves } from "../assets/images/portrait-photography"

function Portraits() {
  return (
    <div className="hero-image-container">
      <img className="hero-image" src={davidFallLeaves.width1440} alt="Kayla Kossajda" />
      <div className="hero-text glass">
        <h1>Portrait Photography</h1>
      </div>
    </div>
  )
}

export default Portraits
