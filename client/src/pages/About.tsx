import Loading from "../components/layout/Loading"
import NavbarPlaceholder from "../components/layout/NavbarPlaceholder"
import { TArticle } from "../core-types"
import useFetchOnRender from "../hooks/useFetchOnRender"

function About() {
  const [articles, pending] = useFetchOnRender<TArticle[]>("/api/articles")

  return (
    <>
      <NavbarPlaceholder />
      <div>
        <h1>About</h1>
        {pending ? (
          <Loading />
        ) : (
          articles.map(article => (
            <div key={article._id}>
              <h2>{article.title}</h2>
              <p>{article.content}</p>
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default About
