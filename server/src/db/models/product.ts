import { HydratedDocument, InferSchemaType, Schema, model } from "mongoose"

const ProductSchema = new Schema({
  category: {
    type: String,
    enum: {
      values: ["photography", "illustration"],
      message: "Invalid Product category",
    },
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  serviceName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})

export default model("Product", ProductSchema)

export type TProduct = HydratedDocument<InferSchemaType<typeof ProductSchema>>
