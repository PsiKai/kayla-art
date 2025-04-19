import { Request, Router, json } from "express"
import User, { TUser } from "../../db/models/user"
import bcrypt from "bcrypt"
import { isAuthenticated } from "../../middleware/auth"

type TUserRequest<TParams extends Record<string, string> = Record<string, string>> = Request<
  TParams,
  object,
  TUser
>

const userRouter = Router()
userRouter.use(json())

userRouter.get("/", async (_req, res) => {
  const users = await User.find({})
  res.write("Hello User Router\n")
  res.write(JSON.stringify(users))
  res.end("\n")
})

userRouter.post("/", async (req: TUserRequest, res) => {
  try {
    const { password } = req.body
    const salt = await bcrypt.genSalt(10)
    const newPass = await bcrypt.hash(password, salt)
    req.body.password = newPass
    const user = new User(req.body)
    await user.save()
    res.status(201).send(user)
  } catch (error) {
    console.log("ERROR: ", error)
    res.status(400).json({ message: error })
  }
})

userRouter.get("/login", isAuthenticated, (_req, res) => {
  res.status(200).send("User is authenticated")
})

userRouter.post("/login", async (req: TUserRequest, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400).end()
    return
  }

  const user = await User.findOne({ email })
  if (!user) {
    res.status(401).end()
    return
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    res.status(401).end()
    return
  }

  req.session.regenerate(sessionError => {
    if (sessionError) console.log("ERROR GENERATING SESSION: ", sessionError)

    req.session.user = user._id.toString()
    req.session.save(sessionSaveError => {
      if (sessionSaveError) {
        console.log("ERROR GENERATING SESSION: ", sessionSaveError)
        res.status(500).json({ message: "Error saving session" })
      } else {
        res.status(200).end()
      }
    })
  })
  // const salt = await bcrypt.genSalt(10)
  // const newPass = await bcrypt.hash(password, salt)
  // await User.findOneAndUpdate({ username }, { password: newPass })
})

export default userRouter
