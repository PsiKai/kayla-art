import React, { FC, useCallback } from "react"
import { TArticle } from "../../core-types"
import { Modal, TModalProps } from "./Modal"

type TDeleteArticleModal = {
  article: TArticle | undefined
  onSubmit: (_id: string) => Promise<void>
} & TModalProps

const DeleteArticleModal: FC<TDeleteArticleModal> = ({
  article = {} as TArticle,
  onSubmit,
  handleExit,
  ...modalProps
}) => {
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      void onSubmit(article._id)
      handleExit()
    },
    [onSubmit, article._id, handleExit],
  )

  return (
    <Modal {...modalProps} handleExit={handleExit}>
      <h2>Delete this article?</h2>
      <h3>{article.title}</h3>
      <p>{article.content}</p>
      <button onClick={handleSubmit}>Confirm Delete</button>
    </Modal>
  )
}

export default DeleteArticleModal
