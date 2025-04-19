import { Router } from "express"
import path from "path"

const appRouter = Router()

appRouter.get("*", (_req, res) => {
  console.log("GET request to /")
  if (process.env.NODE_ENV === "production") {
    res.sendFile(path.join(process.cwd(), "client-dist/index.html"))
  } else {
    res.send("Hello, world!")
  }
})

export default appRouter
