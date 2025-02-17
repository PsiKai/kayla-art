import { haleySenior, monkeyPortrait, veronicaAndDemetrius } from "../assets/images/carousel-photos"
import { umbrellaBoat } from "../assets/images/creative-illustration"
import { flowershoot } from "../assets/images/creative-photography"
import { mermaidIllustration } from "../assets/images/footer-photos"
import { huskyPhoto, jadaSunny } from "../assets/images/pet-photography"
import { borisPainting, michellePainting } from "../assets/images/portrait-illustration"
import { davidFallLeaves, keriTreeBlossoms } from "../assets/images/portrait-photography"
import { TArtWork, TArtworkRoles } from "../context/AppContext"

type HeroMap = {
  [K in Lowercase<TArtWork["category"]>]: {
    [key: string]: {
      [K in Exclude<TArtworkRoles, "carousel" | "gallery">]: { src: string; alt: string }
    }
  }
}

export const heroMap: HeroMap = {
  photography: {
    portraits: {
      hero: {
        src: davidFallLeaves.width1440,
        alt: "David in a field of fall leaves",
      },
      main: {
        src: keriTreeBlossoms.width1440,
        alt: "David in a field of fall leaves",
      },
    },
    creative: {
      hero: {
        src: flowershoot.width1440,
        alt: "A creative photography shoot with flowers",
      },
      main: {
        src: keriTreeBlossoms.width1440,
        alt: "David in a field of fall leaves",
      },
    },
    pets: {
      hero: {
        src: jadaSunny.width1440,
        alt: "A pet photography shoot with Jada in the sun",
      },
      main: {
        src: huskyPhoto.width1440,
        alt: "David in a field of fall leaves",
      },
    },
  },
  illustration: {
    portraits: {
      hero: {
        src: michellePainting.width1440,
        alt: "A portrait illustration of Michelle",
      },
      main: {
        src: borisPainting.width1440,
        alt: "David in a field of fall leaves",
      },
    },
    creative: {
      hero: {
        src: umbrellaBoat.width1440,
        alt: "A creative illustration of an umbrella boat",
      },
      main: {
        src: mermaidIllustration.width1440,
        alt: "David in a field of fall leaves",
      },
    },
  },
}

export const carouselMap = [haleySenior, veronicaAndDemetrius, monkeyPortrait]
