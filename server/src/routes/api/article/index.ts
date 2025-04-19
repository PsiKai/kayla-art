import { Request, Response, Router, json } from "express"
import Article, { TArticle } from "../../../db/models/article"
import { isAuthenticated } from "../../../middleware/auth"

type TArticleRequest<TParams extends Record<string, string> = Record<string, string>> = Request<
  TParams,
  object,
  TArticle
>

type TArticleResponse = Response<
  | { newarticle: TArticle }
  | { resources: TArticle[] }
  | { data: TArticle[] }
  | { message: string }
  | { data: TArticle }
>

const articleRouter = Router()
articleRouter.use(json())

articleRouter.get("/", async (_req, res) => {
  try {
    const articles = await Article.find({})
    res.json({ resources: articles })
  } catch (error) {
    console.error(error)
    res.status(500).send("Error getting articles")
  }
})

articleRouter.post("/", isAuthenticated, async (req, res) => {
  console.log(req.body)
  try {
    const article = new Article(req.body)
    await article.save()
    res.json({ data: article })
  } catch (error) {
    console.error(error)
    res.status(500).send("Error creating article")
  }
})

articleRouter.put("/:_id", isAuthenticated, async (req: TArticleRequest, res: TArticleResponse) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params._id, req.body, { new: true })
    if (!article) {
      res.status(404).json({ message: "article not found" })
      return
    }
    res.json({ data: article })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error updating article" })
  }
})

articleRouter.delete("/:_id", isAuthenticated, async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params._id)
    res.json({ message: "article deleted" })
  } catch (error) {
    console.error(error)
    res.status(500).send("Error deleting article")
  }
})

export default articleRouter
