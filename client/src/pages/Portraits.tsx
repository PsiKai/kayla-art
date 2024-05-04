import heroSample1 from "../assets/images/main-page/samplehero1.jpg"

function Portraits() {
  return (
    <div className="hero-image-container">
      <img className="hero-image" src={heroSample1} alt="Kayla Kossajda" />
      <div className="hero-text glass">
        <h1>Portraits</h1>
      </div>
    </div>
  )
}

export default Portraits
