import { Router } from "express"
import userRouter from "./user.js"

const apiRouter = Router()

apiRouter.get("/", (req, res) => {
  res.send("Hello API router\n")
})

apiRouter.use("/users", userRouter)

export default apiRouter
