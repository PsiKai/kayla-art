import express from "express"
import apiRouter from "./routes/api/index.js"
import appRouter from "./routes/app/index.js"

const app = express()

app.use("/api", apiRouter)
app.use("/", appRouter)

app.listen(3000, () => {
  console.log("Server is running on port 3000")
})
