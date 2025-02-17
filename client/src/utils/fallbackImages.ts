import { haleySenior, monkeyPortrait, veronicaAndDemetrius } from "../assets/images/carousel-photos"
import { umbrellaBoat } from "../assets/images/creative-illustration"
import { flowershoot } from "../assets/images/creative-photography"
import { mermaidIllustration } from "../assets/images/footer-photos"
import { huskyPhoto, jadaSunny } from "../assets/images/pet-photography"
import { borisPainting, michellePainting } from "../assets/images/portrait-illustration"
import { davidFallLeaves, keriTreeBlossoms } from "../assets/images/portrait-photography"
import { TArtWork, TArtworkRoles } from "../context/AppContext"

type HeroMap = {
  [K in TArtWork["category"]]: {
    [key: string]: {
      [K in Exclude<TArtworkRoles, "carousel" | "gallery">]: { src: string; alt: string }
    }
  }
}

export const heroMap: HeroMap = {
  photography: {
    portraits: {
      hero: {
        src: davidFallLeaves.large,
        alt: "David in a field of fall leaves",
      },
      main: {
        src: keriTreeBlossoms.large,
        alt: "David in a field of fall leaves",
      },
    },
    creative: {
      hero: {
        src: flowershoot.large,
        alt: "A creative photography shoot with flowers",
      },
      main: {
        src: keriTreeBlossoms.large,
        alt: "David in a field of fall leaves",
      },
    },
    pets: {
      hero: {
        src: jadaSunny.large,
        alt: "A pet photography shoot with Jada in the sun",
      },
      main: {
        src: huskyPhoto.large,
        alt: "David in a field of fall leaves",
      },
    },
  },
  illustration: {
    portraits: {
      hero: {
        src: michellePainting.large,
        alt: "A portrait illustration of Michelle",
      },
      main: {
        src: borisPainting.large,
        alt: "David in a field of fall leaves",
      },
    },
    creative: {
      hero: {
        src: umbrellaBoat.large,
        alt: "A creative illustration of an umbrella boat",
      },
      main: {
        src: mermaidIllustration.large,
        alt: "David in a field of fall leaves",
      },
    },
  },
}

export const fallbackCarouselMap = [
  { thumbnails: haleySenior },
  { thumbnails: veronicaAndDemetrius },
  { thumbnails: monkeyPortrait },
]
