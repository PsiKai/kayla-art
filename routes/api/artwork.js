import { Router, json } from "express"
import Artwork from "../../db/models/artwork.js"
import { uploader } from "../../middleware/uploader.js"

const artworkRouter = Router()
artworkRouter.use(json())

artworkRouter.get("/", async (_req, res) => {
  const artwork = await Artwork.find({})
  res.json({ artwork })
})

artworkRouter.post("/", uploader, async (req, res) => {
  console.log(req.body)
  const newArt = new Artwork(req.body).toObject()
  res.json({ newArt })
})

artworkRouter.get("/:category", async (req, res) => {
  const { category } = req.params
  try {
    const artwork = await Artwork.find({ category })
    if (artwork.length === 0) {
      return res.status(404).json({ message: "No artwork found" })
    }
    res.json({ artwork })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
})

artworkRouter.get("/:category/:subcategory", async (req, res) => {
  const { category, subcategory } = req.params
  console.log(category, subcategory)
  try {
    const artwork = await Artwork.find({ category, subcategory })
    if (artwork.length === 0) {
      return res.status(404).json({ message: "No artwork found" })
    }
    res.json({ artwork })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
})

artworkRouter.get("/:category/:subcategory/:id", async (req, res) => {
  const { id } = req.params
  try {
    const artwork = await Artwork.findById(id)
    if (!artwork) {
      return res.status(404).json({ message: "No artwork found" })
    }
    res.json({ artwork })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
})

export default artworkRouter
