import { RequestHandler } from "express"
import { slugify } from "../utils/stringUtils"

const slugifyValues: RequestHandler = (req, res, next) => {
  const invalidCharsRegex = /[!"#$%&'()*+,/:;<=>?@[\\\]^`{|}~]/g
  const body = req.body as unknown
  if (!body) {
    res.status(400).json({ message: "Request body is required" })
    return
  }
  const objectBody: Record<string, unknown> = body as Record<string, unknown>

  for (const key in objectBody) {
    if (typeof objectBody[key] === "string") {
      if (invalidCharsRegex.test(objectBody[key])) {
        res.status(400).json({ message: "Invalid characters in request body" })
        return
      }
      objectBody[key] = slugify(objectBody[key].trim())
    }
  }
  next()
}

export default slugifyValues
