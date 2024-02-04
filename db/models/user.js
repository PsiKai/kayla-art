import { Schema, model } from "mongoose"

const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    index: true,
    unique: true,
  },
  password: String,
})

export default model("User", UserSchema)
