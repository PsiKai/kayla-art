import { Router } from "express"
import path from "path"

const appRouter = Router()

appRouter.get("/*", (_req, res) => {
  if (process.env.NODE_ENV === "production") {
    res.sendFile(path.join(process.cwd(), "public/index.html"))
  } else {
    res.send("Hello App Router\n")
  }
})

export default appRouter
