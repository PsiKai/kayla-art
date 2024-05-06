import { useMemo } from "react"
import { Link } from "react-router-dom"

import "../styles/Main.css"
import { haleySenior, monkeyPortrait, veronicaAndDemetrius } from "../assets/images/carousel-photos"
import { keriTreeBlossoms } from "../assets/images/portrait-photography"
import { huskyPhoto } from "../assets/images/pet-photography"
import { borisPainting } from "../assets/images/portrait-illustration"
import { ashleySmoking } from "../assets/images/creative-photography"
import { mermaidIllustration } from "../assets/images/footer-photos"
import { meredithPainting } from "../assets/images/about-me"
import Carousel from "../components/layout/Carousel"

function Main() {
  const carouselImages = useMemo(() => [haleySenior, veronicaAndDemetrius, monkeyPortrait], [])

  return (
    <>
      <div className="hero-image-container">
        <Carousel carouselImages={carouselImages} imageClassName="hero-image" />
        <div className="glass hero-text carousel-hero-text">
          <p>
            Hi, I'm Kayla, a photographer and artist based in Denver, CO. I specialize in artfully
            capturing memoires. Let's connect and create some magic!
          </p>
          <Link to="/about">More about me {`>`}</Link>
        </div>
      </div>
      <div className="hero-image-container">
        <img
          className="hero-image"
          src={keriTreeBlossoms.width1440}
          style={{ objectPosition: "top" }}
          alt="Kayla Kossajda"
        />
        <div className="glass hero-text">
          <Link to="photography/portraits">Portrait Photography</Link>
        </div>
      </div>
      <div className="hero-image-container">
        <img className="hero-image" src={huskyPhoto.width1440} alt="Kayla Kossajda" />
        <div className="glass hero-text">
          <Link to="photography/pets">Pet Photography</Link>
        </div>
      </div>
      <div className="banner">
        <h2>
          I'd love to hear from you. For session info and availability please reach out{" "}
          <Link to="/contact">here</Link>
        </h2>
      </div>
      <div className="hero-image-container">
        <img
          className="hero-image"
          src={borisPainting.width1440}
          alt="Painting of the late Boris"
        />
        <div className="glass hero-text">
          <Link to="illustration/portraits">Portrait Illustration</Link>
        </div>
      </div>
      <div className="hero-image-container">
        <img className="hero-image" src={ashleySmoking.width1440} alt="Kayla Kossajda" />
        <div className="glass hero-text">
          <Link to="photography/creative">Creative Photography</Link>
        </div>
      </div>
      <div className="hero-image-container">
        <img className="hero-image" src={mermaidIllustration.width1440} alt="Kayla Kossajda" />
        <div className="glass hero-text">
          <Link to="illustration/creative">Creative Illustration</Link>
        </div>
      </div>
      <div className="hero-image-container">
        <img className="hero-image" src={meredithPainting.width1440} alt="Kayla Kossajda" />
        <div className="glass hero-text">
          <Link to="/gallery">Gallery</Link>
        </div>
      </div>
    </>
  )
}

export default Main
