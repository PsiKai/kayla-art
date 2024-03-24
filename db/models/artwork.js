import { Schema, model } from "mongoose"

const ArtworkSchema = new Schema({
  category: {
    type: String,
    required: true,
    index: true,
  },
  subCategory: {
    type: String,
    required: true,
    index: true,
  },
  collection: {
    type: String,
    required: true,
    index: true,
  },
  uid: {
    type: String,
    required: true,
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
