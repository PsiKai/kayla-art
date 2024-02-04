import { Router } from "express"

const appRouter = Router()

appRouter.get("/", (req, res) => {
  res.send("Hello App Router\n")
})

export default appRouter
