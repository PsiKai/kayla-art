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
  const user = new User(req.body)
  // await user.save()
  res.write("Hello User POST\n")
  res.write(JSON.stringify(user))
  res.end("\n")
})

export default userRouter
