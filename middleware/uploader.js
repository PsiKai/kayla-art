import busboy from "busboy"
import sharp from "sharp"
import stream from "stream"
import { v4 as uuid } from "uuid"
import { storageClient } from "../google-client.js"

export const uploader = async (req, res, next) => {
  const bb = busboy({ headers: req.headers })
  const uploadPromises = []

  bb.on("file", (_name, file, info) => {
    const { mimeType } = info
    const [_type, extension] = mimeType.split("/")
    req.body.extension = extension
    req.body.uid = uuid()

    const passThrough = new stream.PassThrough()
    file.pipe(passThrough)

    const [fullSizeStream, thumbnailStream] = storageClient.writeStream(req.body)
    const resizeStream = sharp().resize(null, storageClient.THUMBNAIL_SIZE).webp()

    const uploadPromise = new Promise((resolve, reject) => {
      passThrough
        .pipe(fullSizeStream)
        .on("finish", () => {
          console.log("Finished uploading fullsize image")
          resolve()
        })
        .on("error", err => {
          console.log("Error uploading fullsize image")
          console.log(err)
          reject(err)
        })
    })

    const thumbPromise = new Promise((resolve, reject) => {
      passThrough
        .pipe(resizeStream)
        .pipe(thumbnailStream)
        .on("finish", () => {
          console.log("Finished uploading thumbnail")
          resolve()
        })
        .on("error", err => {
          console.log("Error uploading thumbnail")
          console.log(err)
          reject(err)
        })
    })

    uploadPromises.push(uploadPromise, thumbPromise)
  })

  bb.on("field", (name, val) => (req.body[name] = val))

  bb.on("close", () => {
    console.log("Done parsing form!")
    Promise.all(uploadPromises)
      .then(() => next())
      .catch(err => res.status(500).send(err.message))
  })

  req.pipe(bb)
}
