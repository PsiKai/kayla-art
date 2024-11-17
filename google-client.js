import { Storage } from "@google-cloud/storage"
import { slugify } from "./utils/stringUtils.js"

let googleAuth
if (process.env.NODE_ENV !== "production") {
  googleAuth = process.env.GOOGLE_APPLICATION_CREDENTIALS
} else {
  googleAuth = "google-credentials.json"
}

class GoogleClient extends Storage {
  constructor() {
    super({ keyFileName: googleAuth })
  }

  baseStorageUrl = "https://storage.googleapis.com"
  bucketName = process.env.BUCKETNAME
  thumbBucketName = process.env.THUMBS
  thumbnailStorageUrl = `${this.baseStorageUrl}/${this.thumbBucketName}`
  UPLOAD_SIZES = [375, 768, 1440]

  mainBucket = this.bucket(this.bucketName)
  thumbBucket = this.bucket(this.thumbBucketName)

  writeStream(art) {
    const [fullSizeFile, thumbnailFiles] = this.buildPaths(art)
    const thumbnailStreams = this.UPLOAD_SIZES.reduce((acc, size, i) => {
      acc[size] = this.thumbBucket.file(thumbnailFiles[i]).createWriteStream()
      return acc
    }, {})

    return [this.mainBucket.file(fullSizeFile).createWriteStream(), thumbnailStreams]
  }

  deleteFile(art) {
    const [fullSizeFile, thumbnailFiles] = this.buildPaths(art)

    return [
      this.mainBucket.file(fullSizeFile).delete(),
      ...thumbnailFiles.map(file => this.thumbBucket.file(file).delete()),
    ]
  }

  moveFile(oldImg, newImg) {
    const { extension, uid } = oldImg
    const { category, subCategory } = newImg

    const [oldFullSizeFile, oldThumbnailFiles] = this.buildPaths(oldImg)
    const [newFullSizePath, newThumbnailPaths] = this.buildPaths({
      category,
      subCategory,
      extension,
      uid,
    })

    return [
      this.mainBucket.file(oldFullSizeFile).move(newFullSizePath),
      ...oldThumbnailFiles.map((oldFile, i) => {
        return this.thumbBucket.file(oldFile).move(newThumbnailPaths[i])
      }),
    ]
  }

  signedUrl(art, extraOptions = {}) {
    const options = { action: "read", expires: Date.now() + 60_000, ...extraOptions }
    const [filePath] = this.buildPaths(art)

    return this.mainBucket.file(filePath).getSignedUrl(options)
  }

  buildPaths(art) {
    let { category, subCategory, uid, extension } = art
    subCategory = slugify(subCategory)
    const path = `${category}/${subCategory}/${uid}`
    const thumbPaths = this.UPLOAD_SIZES.map(size => `${path}-${size}.webp`)

    return [`${path}.${extension}`, thumbPaths]
  }

  buildThumbnailUrls(art) {
    let { category, subCategory, uid } = art
    subCategory = slugify(subCategory)
    const urls = this.UPLOAD_SIZES.reduce((acc, size) => {
      acc[size] = `${this.thumbnailStorageUrl}/${category}/${subCategory}/${uid}-${size}.webp`
      return acc
    }, {})

    return urls
  }
}

export const storageClient = new GoogleClient()
