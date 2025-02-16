import { Router, json } from "express"
import Artwork from "../../../db/models/artwork"
import { uploader } from "../../../middleware/uploader"
import slugifyValues from "../../../middleware/slugifyValues"
import { storageClient } from "../../../google-client"
import artworkCategoryRouter from "./categories/index"
import { isAuthenticated } from "../../../middleware/auth"

const artworkRouter = Router()
artworkRouter.use(json())

artworkRouter.get("/", async (req, res) => {
  const { limit = 5, offset = 0, ...query } = req.query
  const resources = await Artwork.find(query).skip(+offset).limit(+limit)
  res.json({ resources })
})

artworkRouter.post("/", isAuthenticated, uploader, slugifyValues, async (req, res) => {
  console.log(req.body)
  const newArt = new Artwork({ ...req.body })
  await newArt.save()
  res.json({ newArt })
})

artworkRouter.use("/categories", artworkCategoryRouter)

artworkRouter.get("/:id", async (req, res) => {
  try {
    const foundArtwork = await Artwork.findById(req.params.id)
    if (!foundArtwork) {
      res.status(404).json({ message: "Artwork not found" })
      return
    }
    const resources = { ...foundArtwork.toObject(), originalSrc: "" }
    const [originalSrc] = await storageClient.signedUrl(resources)
    resources.originalSrc = originalSrc
    res.json({ resources })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error fetching artwork" })
  }
})

artworkRouter.put("/:id", isAuthenticated, slugifyValues, async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id).lean()
    if (!artwork) {
      res.status(404).json({ message: "Artwork not found" })
      return
    }
    const moveFiles = storageClient.moveFile(artwork, req.body)
    await Promise.all(moveFiles)
    const updatedArtwork = await Artwork.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true },
    )
    res.json({ updatedArtwork })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error updating artwork" })
  }
})

artworkRouter.delete("/:id", isAuthenticated, async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id).lean()
    if (!artwork) {
      res.status(404).json({ message: "Artwork not found" })
      return
    }
    const bucketDeteletion = storageClient.deleteFile(artwork)
    await Artwork.deleteOne({ _id: req.params.id })
    await Promise.all(bucketDeteletion)
    res.status(204).end()
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error deleting artwork" })
  }
})

export default artworkRouter
