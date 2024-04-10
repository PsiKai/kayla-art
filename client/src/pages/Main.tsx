import "../styles/Main.css"
import { Link } from "react-router-dom"
import heroSample2 from "../assets/images/main-page/samplehero1.jpg"
import heroSample1 from "../assets/images/main-page/sampleherok2.png"
import { ashleySmoking, flowershoot, veronikaWithCat } from "../assets/images/carousel-photos"
import {
  borisIllustration,
  haleySeniorStairs,
  michellePainting,
  monkeyAutumnLeaves,
} from "../assets/images/cover-photos"

function Main() {
  return (
    <>
      <div className="hero-image-container">
        <img className="hero-image" src={veronikaWithCat.width1200} alt="Kayla Kossajda" />
        <div className="hero-text">
          <h1>Kayla Kossajda</h1>
          <h2>Photographer and Illustrator</h2>
          <p>Artfully capturing the world around me.</p>
        </div>
      </div>
      <div className="hero-image-container">
        <img className="hero-image" src={borisIllustration.width1200} alt="Kayla Kossajda" />
        <div className="hero-text">
          <Link to="/illustration">Illustration</Link>
        </div>
      </div>
      <div className="hero-image-container">
        <img className="hero-image" src={michellePainting.width1200} alt="Kayla Kossajda" />
        <div className="hero-text">
          <Link to="/photography/family">Family</Link>
        </div>
      </div>
      <div className="hero-image-container">
        <img className="hero-image" src={monkeyAutumnLeaves.width1200} alt="Kayla Kossajda" />
        <div className="hero-text">
          <Link to="/photography/portraits">Portraits</Link>
        </div>
      </div>
      <div className="hero-image-container">
        <img className="hero-image" src={haleySeniorStairs.width1200} alt="Kayla Kossajda" />
        <div className="hero-text">
          <Link to="/photography/creative">Creative</Link>
        </div>
      </div>
      <div className="hero-image-container">
        <img className="hero-image" src={heroSample2} alt="Kayla Kossajda" />
        <div className="hero-text">
          <Link to="/gallery">Gallery</Link>
        </div>
      </div>
    </>
  )
}

export default Main
