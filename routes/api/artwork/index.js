import { Router, json } from "express"
import Artwork from "../../../db/models/artwork.js"
import { uploader } from "../../../middleware/uploader.js"
import { storageClient } from "../../../google-client.js"
import artworkCategoryRouter from "./categories/index.js"

const artworkRouter = Router()
artworkRouter.use(json())

artworkRouter.get("/", async (req, res) => {
  const resources = await Artwork.find(req.query)
  res.json({ resources })
})

artworkRouter.post("/", uploader, async (req, res) => {
  console.log(req.body)
  const thumbnail = storageClient.buildThumbnailUrl(req.body)
  const newArt = new Artwork({ ...req.body, thumbnail })
  await newArt.save()
  res.json({ newArt })
})

// artworkRouter.get("/categories/:category/subcategories", async (req, res) => {
//   const { category, subCategory } = req.params
//   console.log(category, subCategory)
//   try {
//     const resources = await Artwork.find({ category, subCategory })
//     res.json({ resources })
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ message: error.message })
//   }
// })
artworkRouter.use("/categories", artworkCategoryRouter)

artworkRouter.get("/:id", async (req, res) => {
  try {
    const resources = await Artwork.findById(req.params.id)
    res.json({ resources })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
})

artworkRouter.delete("/:id", async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id).lean()
    const bucketDeteletion = storageClient.deleteFile(artwork)
    await Promise.all(bucketDeteletion)
    await Artwork.deleteOne({ _id: req.params.id })
    res.status(204).end()
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
})

// artworkRouter.get("/:category", async (req, res) => {
//   const { category } = req.params
//   try {
//     const resources = await Artwork.find({ category })
//     res.json({ resources })
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ message: error.message })
//   }
// })
//
// artworkRouter.get("/:category/subcategories/:subCategory", async (req, res) => {
//   const { category, subCategory } = req.params
//   console.log(category, subCategory)
//   try {
//     const resources = await Artwork.find({ category, subCategory })
//     res.json({ resources })
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ message: error.message })
//   }
// })
//
// artworkRouter.get(
//   "/:category/subcategories/:subCategory/collections/:artCollection",
//   async (req, res) => {
//     const { artCollection, category, subCategory } = req.params
//     try {
//       const resources = await Artwork.find({ category, subCategory, artCollection })
//       res.json({ resources })
//     } catch (error) {
//       console.error(error)
//       res.status(500).json({ message: error.message })
//     }
//   },
// )
//
// artworkRouter.get(
//   "/:category/subcategories/:subCategory/collections/:artCollection/artworks/:id",
//   async (req, res) => {
//     const { id } = req.params
//     try {
//       const resources = await Artwork.findById(id)
//       res.json({ resources })
//     } catch (error) {
//       console.error(error)
//       res.status(500).json({ message: error.message })
//     }
//   },
// )

export default artworkRouter
