import { useMemo } from "react"
import { Link } from "react-router-dom"
import useFetchOnRender from "../hooks/useFetchOnRender"
import Carousel from "../components/layout/Carousel"
import { TArtWork } from "../context/AppContext"
import { heroMap } from "../utils/fallbackImages"

import "../styles/Main.css"

function Main() {
  const [carouselImages, pending] = useFetchOnRender<TArtWork[]>(`/api/artworks/roles/carousel`)
  const [sectionImages, sectionPending] = useFetchOnRender<TArtWork[]>(`/api/artworks/roles/main`)

  const mainSectionImageMap = useMemo(() => {
    return sectionImages?.reduce<Record<string, any>>((acc, curr) => {
      const { category, subCategory } = curr
      const key = `${category}/${subCategory}`
      if (!acc[key]) {
        acc[key] = {}
      }
      acc[key] = {
        src: curr.thumbnails.large,
        alt: `An artwork from the ${subCategory} category`,
      }
      return acc
    }, {})
  }, [sectionImages])

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

function HeroImage({
  category,
  subCategory,
  mainSectionImageMap = {},
}: {
  category: TArtWork["category"]
  subCategory: string
  mainSectionImageMap: Record<string, any>
}) {
  const key = `${category}/${subCategory}`
  const src = useMemo(
    () => mainSectionImageMap?.[key]?.src || heroMap[category][subCategory].main.src,
    [category, subCategory, mainSectionImageMap],
  )
  const alt = useMemo(
    () => mainSectionImageMap?.[key]?.alt || heroMap[category][subCategory].main.alt,
    [category, subCategory, mainSectionImageMap],
  )

  return <img className="hero-image" src={src} alt={alt} />
}
