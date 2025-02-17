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
  role: {
    type: String,
    enum: {
      values: ["carousel", "hero", "main", "gallery"],
      message: "Invalid role",
    },
    index: true,
    default: "gallery",
  },
})

ArtworkSchema.virtual("thumbnails").get(function() {
  return storageClient.buildThumbnailUrls(this)
})

ArtworkSchema.set("toJSON", { virtuals: true })
ArtworkSchema.set("toObject", { virtuals: true })

export type Artwork = InferSchemaType<typeof ArtworkSchema>
export const isArtwork = (arg: any): arg is Partial<Artwork> => {
  return Object.keys(arg).every(key => key in ArtworkSchema.obj)
}

ArtworkSchema.pre("findOneAndUpdate", async function(next) {
  const update = this.getUpdate()!
  if (!isArtwork(update)) return

  const { role, category, subCategory } = update
  if (role && role !== "gallery") {
    const Model = this.model

    const demotedDocs = await Model.find({ role, category, subCategory })
    const demotedDocIds = demotedDocs.map(doc => doc._id)
    this.setOptions({ ...this.getOptions(), _updatedDocs: demotedDocIds })

    await Model.updateMany({ role, category, subCategory }, { role: "gallery" })
  }

  next()
})

ArtworkSchema.post("findOneAndUpdate", async function(doc, next) {
  const options = this.getOptions()
  const updatedDocIds = options._updatedDocs as string[]
  doc.updatedRecords = await this.model.find({ _id: { $in: updatedDocIds } })
  next()
})

export default model("Artwork", ArtworkSchema)
