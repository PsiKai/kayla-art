import { RequestHandler } from "express"

export const isAuthenticated: RequestHandler = (req, res, next) => {
  if (req.session.user) next()
  else res.status(401).send("Unauthorized")
}
