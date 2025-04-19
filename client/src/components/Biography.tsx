import React, { useCallback, useContext, useEffect, useMemo, useState } from "react"
import { TArticle, TArticleForm } from "../core-types"
import useFetchOnRender from "../hooks/useFetchOnRender"
import Loading from "./layout/Loading"
import { AppContext } from "../context/appContext"
import { ApiContext } from "../context/apiContext"
import UpdateArticleModal from "./layout/UpdateArticleModal"
import DeleteArticleModal from "./layout/DeleteArticleModal"

function Biography() {
  const {
    state: { articles },
    dispatch,
  } = useContext(AppContext)
  const { createArticle, updateArticle, deleteArticle, articlePending } = useContext(ApiContext)
  const [fetchedArticles, pending] = useFetchOnRender<TArticle[]>("/api/articles")
  const [newArticle, setNewArticle] = useState<TArticleForm>({
    title: "",
    content: "",
  })
  const [openModal, setOpenModal] = useState<"edit" | "delete" | null>(null)
  const [currentArticle, setCurrentArticle] = useState<string | null>(null)

  useEffect(() => {
    dispatch({ type: "SET_ARTICLES", payload: fetchedArticles })
  }, [fetchedArticles, dispatch])

  const handleFinish = useCallback(() => {
    setOpenModal(null)
    setCurrentArticle(null)
  }, [])

  const setEditing = useCallback((id: string) => {
    setOpenModal("edit")
    setCurrentArticle(id)
  }, [])

  const setDeleting = useCallback((id: string) => {
    setOpenModal("delete")
    setCurrentArticle(id)
  }, [])

  const selectedArticle = useMemo(
    () => articles?.find(article => article._id === currentArticle),
    [currentArticle, articles],
  )
  const updateArticleForm: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> =
    useCallback(e => {
      const { name, value } = e.target
      setNewArticle(prev => ({ ...prev, [name]: value }))
    }, [])

  const submitArticle = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (!newArticle.title || !newArticle.content) return
      await createArticle(newArticle)
      setNewArticle({ title: "", content: "" })
    },
    [createArticle, newArticle],
  )

  const submitUpdates = useCallback(
    async (article: TArticleForm) => {
      if (!article._id) return
      await updateArticle(article)
      handleFinish()
    },
    [updateArticle, handleFinish],
  )

  const submitDelete = useCallback(
    async (id: string) => {
      if (!id) return
      await deleteArticle(id)
      handleFinish()
    },
    [deleteArticle, handleFinish],
  )

  if (pending) return <Loading />

  return (
    <div>
      <h3>Upload new </h3>
      <form onSubmit={e => void submitArticle(e)}>
        <div>
          <label htmlFor="title">Title</label>
        </div>
        <div>
          <input
            onChange={updateArticleForm}
            value={newArticle.title}
            id="title"
            type="text"
            name="title"
            placeholder="Title"
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
        </div>
        <div>
          <textarea
            onChange={updateArticleForm}
            value={newArticle.content}
            id="content"
            name="content"
            placeholder="Content"
            required
          ></textarea>
        </div>
        <button disabled={!!articlePending} type="submit">
          Submit
        </button>
      </form>
      <h3>Biography entries</h3>
      <ul>
        {!articles?.length ? (
          <div>No biography entries found.</div>
        ) : (
          articles.map(article => (
            <li key={article._id}>
              <button disabled={!!articlePending} onClick={() => setEditing(article._id)}>
                Edit
              </button>
              <button disabled={!!articlePending} onClick={() => setDeleting(article._id)}>
                Delete
              </button>
              <h3>{article.title}</h3>
              <p>{article.content}</p>
            </li>
          ))
        )}
      </ul>
      <UpdateArticleModal
        open={openModal === "edit"}
        handleExit={handleFinish}
        article={selectedArticle}
        onSubmit={submitUpdates}
      />
      <DeleteArticleModal
        open={openModal === "delete"}
        handleExit={handleFinish}
        article={selectedArticle}
        onSubmit={submitDelete}
      />
    </div>
  )
}

export default Biography
