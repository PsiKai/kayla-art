import busboy from "busboy"
import sharp from "sharp"
import { PassThrough } from "stream"
import { v4 as uuid } from "uuid"
import { storageClient } from "../google-client"
import { RequestHandler } from "express"
import { TArtworkRequest } from "../routes/api/artwork"

const uploadSizes = [375, 768, 1440]

export const uploader: RequestHandler = (req: TArtworkRequest, res, next) => {
  const bb = busboy({ headers: req.headers })
  const uploadPromises: Promise<void>[] = []

  bb.on("file", (_name, file, info) => {
    const { mimeType } = info
    const [_type, extension] = mimeType.split("/")
    req.body.extension = extension
    req.body.uid = uuid()

    const passThrough = new PassThrough()
    file.pipe(passThrough)

    const [fullSizeStream, thumbnailStreams] = storageClient.writeStream(req.body)

    const uploadPromise = new Promise<void>((resolve, reject) => {
      const rotateStream = sharp().rotate()
      passThrough
        .pipe(rotateStream)
        .pipe(fullSizeStream)
        .on("finish", () => {
          console.log("Finished uploading fullsize image")
          resolve()
        })
        .on("error", err => {
          console.log("Error uploading fullsize image")
          if (err instanceof Error) {
            console.log(err)
            reject(err)
          } else {
            reject(new Error("Unknown error uploading fullsize image"))
          }
        })
    })

    const resizePromises = Object.entries(thumbnailStreams).map(([size, thumbnailStream], i) => {
      const resizeStream = sharp().rotate().resize(Number(size)).webp()
      return new Promise<void>((resolve, reject) => {
        passThrough
          .pipe(resizeStream)
          .pipe(thumbnailStream)
          .on("finish", () => {
            console.log("Finished uploading thumbnail for size", uploadSizes[i])
            resolve()
          })
          .on("error", err => {
            console.log("Error uploading thumbnail", uploadSizes[i])
            if (err instanceof Error) {
              console.log(err)
              reject(err)
            } else {
              reject(new Error(`Unknown error uploading thumbnail for size ${uploadSizes[i]}`))
            }
          })
      })
    })

    uploadPromises.push(uploadPromise, ...resizePromises)
  })

  /* @ts-expect-error strong typing can't be applied */
  bb.on("field", (name, val) => (req.body[name] = val))

  bb.on("close", () => {
    console.log("Done parsing form!")
    Promise.all(uploadPromises)
      .then(() => next())
      .catch(err => {
        if (err instanceof Error) {
          console.error("Error uploading files:", err)
          res.status(500).send(err.message)
        }
        console.error("Unknown error uploading files")
        res.status(500).send("Server error uploading files")
      })
  })

  req.pipe(bb)
}
