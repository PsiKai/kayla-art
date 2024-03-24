import { Router } from "express"
import Artwork from "../../../../db/models/artwork.js"

const artworkCategoryRouter = Router()

artworkCategoryRouter.get("/", async (_req, res) => {
  const categories = await Artwork.find().distinct("category")
  res.json({ categories })
})

artworkCategoryRouter.get("/:category/subcategories", async (req, res) => {
  const { category } = req.params
  try {
    const subCategories = await Artwork.find().distinct("subCategory", { category })
    res.json({ subCategories })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
})

artworkCategoryRouter.get("/:category/subcategories/:subCategory/collections", async (req, res) => {
  const { category, subCategory } = req.params
  try {
    const collections = await Artwork.find().distinct("artCollection", { category, subCategory })
    res.json({ collections })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
})

export default artworkCategoryRouter
