import { Router } from "express"
import Artwork from "../../../../db/models/artwork"

const artworkCategoryRouter = Router()

artworkCategoryRouter.get("/", async (_req, res) => {
  const resources = await Artwork.distinct("category")
  res.json({ resources })
})

artworkCategoryRouter.get("/:category/subcategories", async (req, res) => {
  const { category } = req.params
  try {
    const resources = await Artwork.distinct("subCategory", { category })
    res.json({ resources })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error fetching subcategories" })
  }
})

artworkCategoryRouter.get("/:category/subcategories/:subCategory", async (req, res) => {
  const { category, subCategory } = req.params
  try {
    const resources = await Artwork.find({ category, subCategory })
    res.json({ resources })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error fetching collections" })
  }
})

artworkCategoryRouter.get("/:category/subcategories/:subCategory/collections", async (req, res) => {
  const { category, subCategory } = req.params
  try {
    const resources = await Artwork.distinct("artCollection", { category, subCategory })
    res.json({ resources })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error fetching collections" })
  }
})

export default artworkCategoryRouter
