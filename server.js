import "dotenv/config"
import express from "express"
import apiRouter from "./routes/api/index.js"
import appRouter from "./routes/app/index.js"
import initDB from "./db/init.js"
import session from "express-session"

const app = express()
await initDB()

if (process.env.NODE_ENV === "production") {
  app.use(express.static("public"))
}

app.use(
  session({
    secret: process.env.ACCESS_TOKEN_SECRET,
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
