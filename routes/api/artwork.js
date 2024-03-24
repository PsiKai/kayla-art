import { Router, json } from "express"
import Artwork from "../../db/models/artwork.js"
import { uploader } from "../../middleware/uploader.js"
import { storageClient } from "../../google-client.js"

const artworkRouter = Router()
artworkRouter.use(json())

artworkRouter.get("/", async (_req, res) => {
  const resources = await Artwork.find({})
  res.json({ resources })
})

artworkRouter.post("/", uploader, async (req, res) => {
  console.log(req.body)
  const thumbnail = storageClient.buildThumbnailUrl(req.body)
  const newArt = new Artwork({ ...req.body, thumbnail })
  await newArt.save()
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

artworkRouter.get("/:category/subcategories/:subCategory", async (req, res) => {
  const { category, subCategory } = req.params
  console.log(category, subCategory)
  try {
    const resources = await Artwork.find({ category, subCategory })
    res.json({ resources })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
})

artworkRouter.get(
  "/:category/subcategories/:subCategory/collections/:artCollection",
  async (req, res) => {
    const { artCollection, category, subCategory } = req.params
    try {
      const resources = await Artwork.find({ category, subCategory, artCollection })
      res.json({ resources })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: error.message })
    }
  },
)

artworkRouter.get(
  "/:category/subcategories/:subCategory/collections/:artCollection/artworks/:id",
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
