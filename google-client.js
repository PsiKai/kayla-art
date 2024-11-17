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
  THUMBNAIL_SIZE = 500

  mainBucket = this.bucket(this.bucketName)
  thumbBucket = this.bucket(this.thumbBucketName)

  writeStream(art) {
    const [fullSizeFile, thumbnailFile] = this.buildPaths(art)

    return [
      this.mainBucket.file(fullSizeFile).createWriteStream(),
      this.thumbBucket.file(thumbnailFile).createWriteStream(),
    ]
  }

  deleteFile(art) {
    const [fullSizeFile, thumbnailFile] = this.buildPaths(art)

    return [
      this.mainBucket.file(fullSizeFile).delete(),
      this.thumbBucket.file(thumbnailFile).delete(),
    ]
  }

  moveFile(oldImg, newImg) {
    const { extension, uid } = oldImg
    const { category, subCategory } = newImg

    const [oldFullSizeFile, oldThumbnailFile] = this.buildPaths(oldImg)
    const [newFullSizePath, newThumbnailPath] = this.buildPaths({
      category,
      subCategory,
      extension,
      uid,
    })

    return [
      this.mainBucket.file(oldFullSizeFile).move(newFullSizePath),
      this.thumbBucket.file(oldThumbnailFile).move(newThumbnailPath),
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

    return [`${path}.${extension}`, `${path}.webp`]
  }

  buildThumbnailUrl(art) {
    let { category, subCategory, uid } = art
    subCategory = slugify(subCategory)

    return `${this.baseStorageUrl}/${this.thumbBucketName}/${category}/${subCategory}/${uid}.webp`
  }
}

export const storageClient = new GoogleClient()
