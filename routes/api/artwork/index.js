import { Router, json } from "express"
import Artwork from "../../../db/models/artwork.js"
import { uploader } from "../../../middleware/uploader.js"
import slugifyValues from "../../../middleware/slugifyValues.js"
import { storageClient } from "../../../google-client.js"
import artworkCategoryRouter from "./categories/index.js"

const artworkRouter = Router()
artworkRouter.use(json())

artworkRouter.get("/", async (req, res) => {
  const { limit = 5, offset = 0, ...query } = req.query
  const resources = await Artwork.find(query).skip(+offset).limit(+limit)
  res.json({ resources })
})

artworkRouter.post("/", uploader, slugifyValues, async (req, res) => {
  console.log(req.body)
  const thumbnail = storageClient.buildThumbnailUrl(req.body)
  const newArt = new Artwork({ ...req.body, thumbnail })
  await newArt.save()
  res.json({ newArt })
})

artworkRouter.use("/categories", artworkCategoryRouter)

artworkRouter.get("/:id", async (req, res) => {
  try {
    const resources = (await Artwork.findById(req.params.id)).toObject()
    const [originalSrc] = await storageClient.signedUrl(resources)
    resources.originalSrc = originalSrc
    res.json({ resources })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
})

artworkRouter.put("/:id", slugifyValues, async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id).lean()
    const moveFiles = storageClient.moveFile(artwork, req.body)
    await Promise.all(moveFiles)
    const thumbnail = storageClient.buildThumbnailUrl({ ...artwork, ...req.body })
    const updatedArtwork = await Artwork.findByIdAndUpdate(
      req.params.id,
      { ...req.body, thumbnail },
      { new: true },
    )
    res.json({ updatedArtwork })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
})

artworkRouter.delete("/:id", async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id).lean()
    const bucketDeteletion = storageClient.deleteFile(artwork)
    await Artwork.deleteOne({ _id: req.params.id })
    await Promise.all(bucketDeteletion)
    res.status(204).end()
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
})

export default artworkRouter
