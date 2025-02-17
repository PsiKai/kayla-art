import { flowershoot } from "../assets/images/creative-photography"

function CreativePhotography() {
  return (
    <div className="hero-image-container">
      <img className="hero-image" src={flowershoot.large} alt="Kayla Kossajda" />
      <div className="glass hero-text">
        <h1>Creative Photography</h1>
      </div>
    </div>
  )
}

export default CreativePhotography
