import { InferSchemaType, Schema, model } from "mongoose"

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
  },
  price: {
    type: Number,
    required: true,
  },
  serviceName: {
    type: String,
  },
  description: {
    type: String,
  },
})

export default model("Product", ProductSchema)

export type Product = InferSchemaType<typeof ProductSchema>
