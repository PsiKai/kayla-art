import "dotenv/config"
import express from "express"
import session from "express-session"
import { CipherKey } from "crypto"
import path from "path"
import apiRouter from "./routes/api/index"
import appRouter from "./routes/app/index"
import initDB from "./db/init"

const app = express()
initDB().catch(console.error)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(process.cwd(), "client-dist")))
}

const accessToken: CipherKey = process.env.ACCESS_TOKEN_SECRET!

declare module "express-session" {
  interface SessionData {
    user: string
  }
}

app.use(
  session({
    secret: accessToken,
    resave: false,
    saveUninitialized: false,
    cookie: {
      // secure: process.env.NODE_ENV === "production",
      secure: false,
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
      httpOnly: false,
    },
  }),
)

app.use("/api", apiRouter)
app.use("/", appRouter)
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`)
})
