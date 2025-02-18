import { createContext, useCallback, useContext, useState } from "react"
import { AppContext, TArtWork } from "./AppContext"
import { TArtworkForm } from "../components/form/ArtworkForm"

type TApiContext = {
  pending: string
  error: string
  createArtwork: (form: FormData, artworkName: string) => Promise<void>
  updateArtwork: (values: TArtworkForm, _id: string) => Promise<void>
  deleteArtwork: (_id: string) => Promise<void>
}

export const ApiContext = createContext<TApiContext>({} as TApiContext)

export function ApiProvider({ children }: { children: React.ReactNode }) {
  const [pending, setPending] = useState<string>("")
  const [error, setError] = useState<string>("")
  const { dispatch } = useContext(AppContext)

  const createArtwork = useCallback(
    async (uploadFormData: FormData, artworkName: string) => {
      setPending(artworkName)

      try {
        const res = await fetch("/api/artworks", {
          method: "POST",
          body: uploadFormData,
        })

        if (!res.ok) {
          throw new Error(`Failed to upload artwork: ${await res.text()}`)
        }

        const { newArt } = await res.json()
        dispatch({ type: "ADD_ARTWORK", payload: newArt })
      } catch (err) {
        console.error(err)
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError("An unknown error occurred while uploading artwork")
        }
      } finally {
        setPending("")
      }
    },
    [dispatch],
  )

  const updateArtwork = useCallback(
    async (values: TArtworkForm, _id: string) => {
      setPending(_id)
      try {
        const response = await fetch(`/api/artworks/${_id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        })

        if (!response.ok) {
          throw new Error(`Failed to update artwork: ${await response.text()}`)
        }

        const { data } = await response.json()
        dispatch({ type: "UPDATE_ARTWORK", payload: data as TArtWork[] })
      } catch (error) {
        console.error(error)

        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError("An unknown error occurred while updating artwork")
        }
      } finally {
        setPending("")
      }
    },
    [dispatch],
  )

  const deleteArtwork = useCallback(
    async (_id: string) => {
      setPending(_id)
      try {
        const response = await fetch(`/api/artworks/${_id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error(`Failed to delete artwork: ${await response.text()}`)
        }

        dispatch({ type: "DELETE_ARTWORK", payload: _id })
        console.log("Artwork deleted")
      } catch (error) {
        console.error(error)

        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError("An unknown error occurred while deleting artwork")
        }
      } finally {
        setPending("")
      }
    },
    [dispatch],
  )

  const value = {
    pending,
    error,
    createArtwork,
    updateArtwork,
    deleteArtwork,
  }

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>
}
