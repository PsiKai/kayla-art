import { TProduct } from "../context/AppContext"
import useFetchOnRender from "../hooks/useFetchOnRender"
import NewProduct from "./form/NewProduct"
import Loading from "./layout/Loading"

function AdminPricing() {
  const [products, pending] = useFetchOnRender<TProduct[]>("/api/products")

  return (
    <div style={{ position: "relative", minHeight: "100px" }}>
      <h3>AdminPricing</h3>
      <NewProduct />
      {pending ? (
        <Loading />
      ) : (
        <>
          <h4>Products</h4>
          <ul>
            {products.map(product => (
              <li key={product._id}>
                <h4>{product.serviceName}</h4>
                <p>{product.price}</p>
                <p>{product.size}</p>
                <p>{product.description}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default AdminPricing
