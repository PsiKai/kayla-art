import { Schema, model } from "mongoose"

const ArtworkSchema = new Schema({
  category: {
    type: String,
    required: true,
    index: true,
  },
  subcategory: {
    type: String,
    required: true,
    index: true,
  },
  collection: {
    type: String,
    required: true,
    index: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  extension: {
    type: String,
    required: true,
  },
})

export default model("Artwork", ArtworkSchema)
