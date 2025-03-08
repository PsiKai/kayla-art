import { Router } from "express"
import userRouter from "./user"
import artworkRouter from "./artwork"
import productRouter from "./product"

const apiRouter = Router()

apiRouter.use(async (_req, _res, next) => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  next()
})

apiRouter.get("/", (_req, res) => {
  res.send("Hello API router\n")
})

apiRouter.use("/users", userRouter)
apiRouter.use("/artworks", artworkRouter)
apiRouter.use("/products", productRouter)

export default apiRouter
