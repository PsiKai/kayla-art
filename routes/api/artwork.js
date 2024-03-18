import { Router, json } from "express"
import Artwork from "../../db/models/artwork.js"

const artworkRouter = Router()
artworkRouter.use(json())

artworkRouter.get("/", async (_req, res) => {
  const artwork = await Artwork.find({})
  res.json({ artwork })
})

artworkRouter.post("/", async (req, res) => {
  console.log(req.body)
  const newArt = new Artwork(req.body).toObject()
  res.json({ newArt })
})

export default artworkRouter
