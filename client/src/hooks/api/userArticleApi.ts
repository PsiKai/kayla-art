import React, { useCallback, useState } from "react"
import { TAppDispatch, TArticle, TArticleForm } from "../../core-types"

export type TArticleApi = {
  articlePending: string
  articleError: string
  createArticle: (_articleForm: TArticleForm) => Promise<TArticle[] | void>
  updateArticle: (_values: TArticleForm) => Promise<TArticle[] | void>
  deleteArticle: (_id: string) => Promise<void>
}

export const useArticleApi = (dispatch: React.Dispatch<TAppDispatch>) => {
  const [articlePending, setPending] = useState<string>("")
  const [articleError, setError] = useState<string>("")

  const createArticle: TArticleApi["createArticle"] = useCallback(
    async articleForm => {
      setPending(articleForm.title)

      try {
        const res = await fetch("/api/articles", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(articleForm),
        })

        if (!res.ok) {
          throw new Error(`Failed to upload article: ${await res.text()}`)
        }

        const { data } = (await res.json()) as { data: TArticle }
        dispatch({ type: "ADD_ARTICLE", payload: data })
      } catch (err) {
        console.error(err)
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError("An unknown error occurred while uploading article")
        }
      } finally {
        setPending("")
      }
    },
    [dispatch],
  )

  const updateArticle = useCallback(
    async (values: TArticle) => {
      setPending(values?._id ? values._id : values.title)
      try {
        const response = await fetch(`/api/articles/${values._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        })

        if (!response.ok) {
          throw new Error(`Failed to update article: ${await response.text()}`)
        }

        const { data } = (await response.json()) as { data: TArticle }
        dispatch({ type: "UPDATE_ARTICLE", payload: data })
      } catch (error) {
        console.error(error)

        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError("An unknown error occurred while updating article")
        }
      } finally {
        setPending("")
      }
    },
    [dispatch],
  )

  const deleteArticle = useCallback(
    async (_id: string) => {
      setPending(_id)
      try {
        const response = await fetch(`/api/articles/${_id}`, {
          method: "DELETE",
        })

        if (!response.ok) {
          throw new Error(`Failed to delete article: ${await response.text()}`)
        }

        dispatch({ type: "DELETE_ARTICLE", payload: _id })
      } catch (error) {
        console.error(error)

        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError("An unknown error occurred while deleting article")
        }
      }
    },
    [dispatch],
  )

  return { articlePending, articleError, createArticle, updateArticle, deleteArticle }
}
