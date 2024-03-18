import { Router } from "express"
import userRouter from "./user.js"
import artworkRouter from "./artwork.js"

const apiRouter = Router()

apiRouter.get("/", (_req, res) => {
  res.send("Hello API router\n")
})

apiRouter.use("/users", userRouter)
apiRouter.use("/artworks", artworkRouter)

export default apiRouter
