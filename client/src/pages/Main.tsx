import { Link } from "react-router-dom"
import useFetchOnRender from "../hooks/useFetchOnRender"
import Carousel from "../components/layout/Carousel"
import { TArtWork } from "../context/AppContext"
import { useSectionImageMap } from "../hooks/artworkMapping/useSectionImageMap"
import { HeroImage } from "../components/layout/HeroImage"

import "../styles/Main.css"

function Main() {
  const [carouselImages, pending] = useFetchOnRender<TArtWork[]>(`/api/artworks/roles/carousel`)
  const [sectionImages, sectionPending] = useFetchOnRender<TArtWork[]>(`/api/artworks/roles/main`)
  const mainSectionImageMap = useSectionImageMap(sectionImages)

  if (pending || sectionPending) return <div>Loading...</div>

  return (
    <>
      <div className="hero-image-container">
        <Carousel carouselImages={carouselImages} imageClassName="hero-image" />
        <div className="glass hero-text carousel-hero-text">
          <p>Hi, I'm Kayla</p>
          <p>Photographer and artist based in Denver, CO.</p>
          <p>I specialize in artfully capturing memories. Let's connect and create some magic!</p>
          <Link to="/contact">Contact Me! {`>`}</Link>
        </div>
      </div>
      <div className="hero-image-container">
        <HeroImage
          category="photography"
          subCategory="portraits"
          role="main"
          mainSectionImageMap={mainSectionImageMap}
        />
        <div className="glass hero-text">
          <Link to="photography/portraits">Portrait Photography</Link>
        </div>
      </div>
      <div className="hero-image-container">
        <HeroImage
          category="photography"
          subCategory="pets"
          role="main"
          mainSectionImageMap={mainSectionImageMap}
        />
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
        <HeroImage
          category="illustration"
          subCategory="portraits"
          role="main"
          mainSectionImageMap={mainSectionImageMap}
        />
        <div className="glass hero-text">
          <Link to="illustration/portraits">Portrait Illustration</Link>
        </div>
      </div>
      <div className="hero-image-container">
        <HeroImage
          category="photography"
          subCategory="creative"
          role="main"
          mainSectionImageMap={mainSectionImageMap}
        />
        <div className="glass hero-text">
          <Link to="photography/creative">Creative Photography</Link>
        </div>
      </div>
      <div className="hero-image-container">
        <HeroImage
          category="illustration"
          subCategory="creative"
          role="main"
          mainSectionImageMap={mainSectionImageMap}
        />
        <div className="glass hero-text">
          <Link to="illustration/creative">Creative Illustration</Link>
        </div>
      </div>
    </>
  )
}

export default Main
