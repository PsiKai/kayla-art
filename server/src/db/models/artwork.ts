import { HydratedDocument, InferSchemaType, Schema, model } from "mongoose"
import { storageClient } from "../../google-client"

const ArtworkSchema = new Schema({
  category: {
    type: String,
    enum: {
      values: ["photography", "illustration"],
      message: "Invalid Artwork category",
    },
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

ArtworkSchema.virtual("thumbnails").get(function () {
  return storageClient.buildThumbnailUrls(this)
})

ArtworkSchema.set("toJSON", { virtuals: true })
ArtworkSchema.set("toObject", { virtuals: true })

export type TArtworkSchema = InferSchemaType<typeof ArtworkSchema>
export type TArtwork = HydratedDocument<TArtworkSchema>
export const isArtwork = (arg: object): arg is Partial<TArtwork> => {
  return Object.keys(arg).every(key => key in ArtworkSchema.obj)
}

ArtworkSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate()!
  if (!isArtwork(update)) return

  const { role, category, subCategory } = update
  if (role && role !== "gallery") {
    const Model = this.model

    const demotedDocs = await Model.find<HydratedDocument<TArtwork>>({
      role,
      category,
      subCategory,
    })
    const demotedDocIds = demotedDocs.map(doc => doc._id)
    this.setOptions({ ...this.getOptions(), _updatedDocs: demotedDocIds })

    await Model.updateMany({ role, category, subCategory }, { role: "gallery" })
  }

  next()
})

ArtworkSchema.post("findOneAndUpdate", async function (doc: ArtworkDocument, next) {
  const options = this.getOptions()
  const updatedDocIds = options._updatedDocs as string[]
  const Model = this.model
  doc.updatedRecords = await Model.find<TArtwork>({ _id: { $in: updatedDocIds } })
  next()
})

interface ArtworkDocument extends TArtwork {
  updatedRecords: TArtwork[]
}

export default model("Artwork", ArtworkSchema)
