import { Router } from "express"

const apiRouter = Router()

apiRouter.get("/", (req, res) => {
  res.send("Hello API router\n")
})

export default apiRouter
