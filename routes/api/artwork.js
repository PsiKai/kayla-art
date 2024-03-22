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
    const resources = await Artwork.find({ category })
    res.json({ resources })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
})

artworkRouter.get("/:category/subcategories/:subcategory", async (req, res) => {
  const { category, subcategory } = req.params
  console.log(category, subcategory)
  try {
    const resources = await Artwork.find({ category, subcategory })
    res.json({ resources })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
})

artworkRouter.get(
  "/:category/subcategories/:subcategory/collections/:artCollection",
  async (req, res) => {
    const { artCollection, category, subcategory } = req.params
    try {
      const resources = await Artwork.find({ category, subcategory, artCollection })
      res.json({ resources })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: error.message })
    }
  },
)

artworkRouter.get(
  "/:category/subcategories/:subcategory/collections/:artCollection/works/:id",
  async (req, res) => {
    const { id } = req.params
    try {
      const resources = await Artwork.findById(id)
      res.json({ resources })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: error.message })
    }
  },
)

export default artworkRouter
