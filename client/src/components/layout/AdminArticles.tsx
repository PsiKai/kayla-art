import { TArticle } from "../../core-types"
import useFetchOnRender from "../../hooks/useFetchOnRender"
import Loading from "./Loading"

export const AdminArticles = () => {
  const [fetchedArticles, pending] = useFetchOnRender<TArticle[]>("/api/articles")

  if (pending) return <Loading />

  if (!fetchedArticles?.length) return <div>No biography entries found.</div>

  return (
    <div>
      <h2>Articles</h2>
      <ul>
        {fetchedArticles.map(article => (
          <li key={article._id}>
            <h3>{article.title}</h3>
            <p>{article.content}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
