import { Bucket, GetSignedUrlConfig, Storage } from "@google-cloud/storage"
import { slugify } from "./utils/stringUtils"
import type { Artwork } from "./db/models/artwork"

let googleAuth: string
if (process.env.NODE_ENV !== "production") {
  googleAuth = process.env.GOOGLE_APPLICATION_CREDENTIALS || ""
} else {
  googleAuth = "google-credentials.json"
}

type UploadSizes = "small" | "medium" | "large"
type ThumbnailSizes = 375 | 768 | 1440

class GoogleClient extends Storage {
  public baseStorageUrl: string
  public bucketName: string
  public thumbBucketName: string
  public thumbnailStorageUrl: string
  public UPLOAD_SIZES: Record<UploadSizes, ThumbnailSizes>
  public mainBucket: Bucket
  public thumbBucket: Bucket

  constructor() {
    super({ keyFilename: googleAuth })

    this.baseStorageUrl = "https://storage.googleapis.com"
    this.bucketName = process.env.BUCKETNAME!
    this.thumbBucketName = process.env.THUMBS!
    this.thumbnailStorageUrl = `${this.baseStorageUrl}/${this.thumbBucketName}`
    this.UPLOAD_SIZES = {
      small: 375,
      medium: 768,
      large: 1440,
    }
    this.mainBucket = this.bucket(this.bucketName)
    this.thumbBucket = this.bucket(this.thumbBucketName)
  }

  writeStream(art: Artwork): [NodeJS.WritableStream, Record<string, NodeJS.WritableStream>] {
    const [fullSizeFile, thumbnailFiles] = this.buildPaths(art)
    const thumbnailStreams = Object.values(this.UPLOAD_SIZES).reduce<
      Record<string, NodeJS.WritableStream>
    >((acc, size, i) => {
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
    const thumbPaths = Object.keys(this.UPLOAD_SIZES).map(size => `${path}-${size}.webp`)

    return [`${path}.${extension}`, thumbPaths]
  }

  buildThumbnailUrls(art: Artwork): Record<UploadSizes, string> {
    let { category, subCategory, uid } = art
    subCategory = slugify(subCategory)
    const urls = Object.keys(this.UPLOAD_SIZES).reduce(
      (acc, size) => {
        acc[size as UploadSizes] =
          `${this.thumbnailStorageUrl}/${category}/${subCategory}/${uid}-${size}.webp`
        return acc
      },
      { small: "", medium: "", large: "" },
    )

    return urls
  }
}

export const storageClient = new GoogleClient()
