import "../styles/Main.css"
import { Link } from "react-router-dom"
import heroSample2 from "../assets/images/main-page/samplehero1.jpg"
import { monkeyPortrait, haleySenior, veronicaAndDemetrius } from "../assets/images/carousel-photos"
import { ashleySmoking, monkeyAutumnLeaves, haleySeniorStairs } from "../assets/images/cover-photos"
import { useEffect, useMemo, useRef, useState } from "react"

function Main() {
  const [carouselIndex, setCarouselIndex] = useState<number>(0)

  const carouselImages = useMemo(() => [haleySenior, veronicaAndDemetrius, monkeyPortrait], [])

  const carouselTimer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    carouselTimer.current = setInterval(() => {
      setCarouselIndex(prevIndex => (prevIndex + 1) % carouselImages.length)
    }, 5000)

    const timer = carouselTimer.current!

    return () => clearInterval(timer)
  }, [carouselTimer, carouselImages])

  return (
    <>
      <div className="hero-image-container">
        <img
          className="hero-image"
          src={carouselImages[carouselIndex].width1200}
          alt="Kayla Kossajda"
        />
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
          src={haleySeniorStairs.width1200}
          style={{ objectPosition: "top" }}
          alt="Kayla Kossajda"
        />
        <div className="glass hero-text">
          <Link to="/portraits">Portraits</Link>
        </div>
      </div>
      <div className="hero-image-container">
        <img className="hero-image" src={monkeyAutumnLeaves.width1200} alt="Kayla Kossajda" />
        <div className="glass hero-text">
          <Link to="/pets">Pets</Link>
        </div>
      </div>
      <div className="banner">
        <h2>
          I'd love to hear from you. For session info and availability please reach out{" "}
          <Link to="/contact">here</Link>
        </h2>
      </div>
      <div className="hero-image-container">
        <img className="hero-image" src={ashleySmoking.width1200} alt="Kayla Kossajda" />
        <div className="glass hero-text">
          <Link to="/creative">Creative</Link>
        </div>
      </div>
      <div className="hero-image-container">
        <img className="hero-image" src={heroSample2} alt="Kayla Kossajda" />
        <div className="glass hero-text">
          <Link to="/gallery">Gallery</Link>
        </div>
      </div>
    </>
  )
}

export default Main
