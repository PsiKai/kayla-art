import { Router } from "express"
import path from "path"

const appRouter = Router()

appRouter.get("*", (_req, res) => {
  res.sendFile(path.join(process.cwd(), "../public/index.html"))
})

export default appRouter
