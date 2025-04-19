import React, { FC, useCallback, useEffect, useState } from "react"
import { TArticle, TArticleForm } from "../../core-types"
import { Modal, TModalProps } from "./Modal"

type TUpdateArticleModal = {
  article: TArticle | undefined
  onSubmit: (_article: TArticleForm) => Promise<void>
} & TModalProps

const UpdateArticleModal: FC<TUpdateArticleModal> = ({
  article,
  onSubmit,
  handleExit,
  ...modalProps
}) => {
  const [form, setForm] = useState<TArticleForm>({ title: "", content: "" })

  useEffect(() => {
    setForm(prev => ({ ...prev, ...article }))
  }, [article])

  const updateArticle: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> =
    useCallback(e => {
      const { name, value } = e.target
      setForm(prev => ({ ...prev, [name]: value }))
    }, [])

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      void onSubmit(form)
      handleExit()
    },
    [onSubmit, form, handleExit],
  )

  return (
    <Modal {...modalProps} handleExit={handleExit}>
      <h2>Update this Article</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
        </div>
        <div>
          <input
            onChange={updateArticle}
            value={form.title}
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
            onChange={updateArticle}
            value={form.content}
            id="content"
            name="content"
            placeholder="Content"
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </Modal>
  )
}

export default UpdateArticleModal
