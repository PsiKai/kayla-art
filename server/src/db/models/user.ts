import { InferSchemaType, Schema, model } from "mongoose"

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    index: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
})

export default model("User", UserSchema)

export type User = InferSchemaType<typeof UserSchema>
