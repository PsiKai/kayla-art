/* global NodeJS */
import React, { useEffect, useMemo, useRef, useState } from "react"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import { fallbackCarouselMap } from "../../utils/fallbackImages"

import "../../styles/transitions.css"
import { TArtWork } from "../../core-types"

type TCarouselProps = {
  carouselImages: Pick<TArtWork, "thumbnails">[]
  imageClassName?: string
}

function Carousel({ carouselImages = [], imageClassName }: TCarouselProps) {
  const [carouselIndex, setCarouselIndex] = useState<number>(0)
  const carouselTimer = useRef<NodeJS.Timeout | null>(null)
  const transitionTimer = useMemo(() => 700, [])
  const carouselDuration = useMemo(() => 5000, [])
  const images = useMemo(
    () => (carouselImages.length ? carouselImages : fallbackCarouselMap),
    [carouselImages],
  )

  useEffect(() => {
    carouselTimer.current = setInterval(() => {
      setCarouselIndex(prevIndex => (prevIndex + 1) % images.length)
    }, carouselDuration)

    const timer = carouselTimer.current

    return () => clearInterval(timer)
  }, [carouselTimer, carouselImages, carouselDuration, images.length])

  return (
    <TransitionGroup component={null}>
      <CSSTransition key={carouselIndex} timeout={transitionTimer} classNames="slide-in">
        <img
          style={{ "--transition-duration": `${transitionTimer}ms` } as React.CSSProperties}
          className={imageClassName}
          src={images[carouselIndex]?.thumbnails.large}
          alt="Kayla Kossajda"
        />
      </CSSTransition>
    </TransitionGroup>
  )
}

export default Carousel
