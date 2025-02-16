import { Bucket, GetSignedUrlConfig, Storage } from "@google-cloud/storage"
import { slugify } from "./utils/stringUtils.js"
import type { Artwork } from "./db/models/artwork.js"

let googleAuth: string
if (process.env.NODE_ENV !== "production") {
  googleAuth = process.env.GOOGLE_APPLICATION_CREDENTIALS || ""
} else {
  googleAuth = "google-credentials.json"
}

class GoogleClient extends Storage {
  public baseStorageUrl: string
  public bucketName: string
  public thumbBucketName: string
  public thumbnailStorageUrl: string
  public UPLOAD_SIZES: number[]
  public mainBucket: Bucket
  public thumbBucket: Bucket

  constructor() {
    super({ keyFilename: googleAuth })

    this.baseStorageUrl = "https://storage.googleapis.com"
    this.bucketName = process.env.BUCKETNAME!
    this.thumbBucketName = process.env.THUMBS!
    this.thumbnailStorageUrl = `${this.baseStorageUrl}/${this.thumbBucketName}`
    this.UPLOAD_SIZES = [375, 768, 1440]
    this.mainBucket = this.bucket(this.bucketName)
    this.thumbBucket = this.bucket(this.thumbBucketName)
  }

  writeStream(art: Artwork): [NodeJS.WritableStream, Record<string, NodeJS.WritableStream>] {
    const [fullSizeFile, thumbnailFiles] = this.buildPaths(art)
    const thumbnailStreams = this.UPLOAD_SIZES.reduce((acc, size, i) => {
      acc[size] = this.thumbBucket.file(thumbnailFiles[i]).createWriteStream()
      return acc
    }, {})

    return [this.mainBucket.file(fullSizeFile).createWriteStream(), thumbnailStreams]
  }

  deleteFile(art: Artwork) {
    const [fullSizeFile, thumbnailFiles] = this.buildPaths(art)

    return [
      this.mainBucket.file(fullSizeFile).delete(),
      ...thumbnailFiles.map(file => this.thumbBucket.file(file).delete()),
    ]
  }

  moveFile(oldImg: Artwork, newImg: Artwork) {
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

  signedUrl(art: Artwork, extraOptions: Partial<GetSignedUrlConfig> = {}) {
    const options = { action: "read" as const, expires: Date.now() + 60_000, ...extraOptions }
    const [filePath] = this.buildPaths(art)

    return this.mainBucket.file(filePath).getSignedUrl(options)
  }

  buildPaths(art: Partial<Artwork>): [string, string[]] {
    let { category, subCategory, uid, extension } = art
    subCategory = slugify(subCategory || "")
    const path = `${category}/${subCategory}/${uid}`
    const thumbPaths = this.UPLOAD_SIZES.map(size => `${path}-${size}.webp`)

    return [`${path}.${extension}`, thumbPaths]
  }

  buildThumbnailUrls(art: Artwork) {
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
