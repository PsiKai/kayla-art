import { InferSchemaType, Schema, model } from "mongoose"

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  images: {
    type: [Schema.Types.ObjectId],
    ref: "Artwork",
  },
})

export default model("Article", ArticleSchema)

export type Article = InferSchemaType<typeof ArticleSchema>
