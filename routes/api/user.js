import { Router, json } from "express"
import User from "../../db/models/user.js"

const userRouter = Router()
userRouter.use(json())

userRouter.get("/", async (req, res) => {
  const users = await User.find({})
  res.write("Hello User Router\n")
  res.write(JSON.stringify(users))
  res.end("\n")
})

userRouter.post("/", async (req, res) => {
  // const user = req.body
  const user = new User(req.body).toObject()
  // await user.save()
  res.write("Hello User POST\n")
  Object.entries(user).forEach(value => {
    res.write(JSON.stringify(value) + "\n")
  })
  res.end("\n")
})

export default userRouter
