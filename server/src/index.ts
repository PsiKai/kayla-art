import "dotenv/config"
import express from "express"
import apiRouter from "./routes/api/index"
import appRouter from "./routes/app/index"
import initDB from "./db/init"
import session from "express-session"
import { CipherKey } from "crypto"

const app = express()
await initDB()

if (process.env.NODE_ENV === "production") {
  app.use(express.static("public"))
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
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
      httpOnly: false,
    },
  }),
)

app.use("/api", apiRouter)
app.use("/", appRouter)

app.listen(3000, () => {
  console.log("Server is running on port 3000")
})
