import { useEffect, useMemo, useRef, useState } from "react"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import { TArtWork } from "../../context/AppContext"

import "../../styles/transitions.css"
// import { carouselMap } from "../../utils/fallbackImages"

type TCarouselProps = {
  carouselImages: TArtWork[]
  imageClassName?: string
}

function Carousel({ carouselImages = [], imageClassName }: TCarouselProps) {
  const [carouselIndex, setCarouselIndex] = useState<number>(0)
  const carouselTimer = useRef<NodeJS.Timeout | null>(null)
  const transitionTimer = useMemo(() => 700, [])
  const carouselDuration = useMemo(() => 5000, [])
  // const images = useMemo(
  //   () => (carouselImages.length ? carouselImages : carouselMap),
  //   [carouselImages],
  // )

  useEffect(() => {
    carouselTimer.current = setInterval(() => {
      setCarouselIndex(prevIndex => (prevIndex + 1) % carouselImages.length)
    }, carouselDuration)

    const timer = carouselTimer.current!

    return () => clearInterval(timer)
  }, [carouselTimer, carouselImages, carouselDuration])

  return (
    <TransitionGroup component={null}>
      <CSSTransition key={carouselIndex} timeout={transitionTimer} classNames="slide-in">
        <img
          style={{ "--transition-duration": `${transitionTimer}ms` } as React.CSSProperties}
          className={imageClassName}
          src={carouselImages[carouselIndex]?.thumbnails["1440"]}
          alt="Kayla Kossajda"
        />
      </CSSTransition>
    </TransitionGroup>
  )
}

export default Carousel
