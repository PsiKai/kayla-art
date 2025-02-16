import { RequestHandler } from "express"
import { slugify } from "../utils/stringUtils.js"

const slugifyValues: RequestHandler = (req, res, next) => {
  const invalidCharsRegex = /[!"#$%&'()*+,/:;<=>?@[\\\]^`{|}~]/g
  const { body } = req
  for (const key in body) {
    if (typeof body[key] === "string") {
      if (invalidCharsRegex.test(body[key])) {
        res.status(400).json({ message: "Invalid characters in request body" })
      }
      body[key] = slugify(body[key].trim())
    }
  }
  next()
}

export default slugifyValues
