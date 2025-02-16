import { InferSchemaType, Schema, model } from "mongoose"
import { storageClient } from "../../google-client"

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
  uid: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  extension: {
    type: String,
    required: true,
  },
  carousel: {
    type: Boolean,
    index: true,
    default: false,
  },
  hero: {
    type: Boolean,
    index: true,
    default: false,
  },
  main: {
    type: Boolean,
    index: true,
    default: false,
  },
})

ArtworkSchema.virtual("thumbnails").get(function () {
  return storageClient.buildThumbnailUrls(this)
})

ArtworkSchema.set("toJSON", { virtuals: true })
ArtworkSchema.set("toObject", { virtuals: true })

export default model("Artwork", ArtworkSchema)

export type Artwork = InferSchemaType<typeof ArtworkSchema>
