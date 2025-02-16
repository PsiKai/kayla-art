import artwork from "./models/artwork"
import user from "./models/user"

export type Artwork = typeof artwork.schema.obj
export type User = typeof user.schema.obj
