import { useMemo } from "react"
import NavbarPlaceholder from "../components/layout/NavbarPlaceholder"
import useFetchOnRender from "../hooks/useFetchOnRender"
import Loading from "../components/layout/Loading"
import { TProduct } from "../core-types"

function Pricing() {
  const [products, pending] = useFetchOnRender<TProduct[]>("/api/products")

  const groupedProducts = useMemo(
    () =>
      products?.reduce(
        (acc, product) => {
          acc[product.category].push(product)
          return acc
        },
        { photography: [], illustration: [] } as Record<TProduct["category"], TProduct[]>,
      ),
    [products],
  )

  return (
    <>
      <NavbarPlaceholder />
      {pending ? (
        <Loading />
      ) : (
        <>
          <div>
            <h3>Photography</h3>
            {groupedProducts.photography.map(product => (
              <div key={product._id}>
                <p>{product.serviceName}</p>
                <p>${product.price}</p>
                <p>{product.description}</p>
              </div>
            ))}
          </div>
          <div>
            <h3>Illustration</h3>
            {groupedProducts.illustration.map(product => (
              <div key={product._id}>
                <p>{product.serviceName}</p>
                <p>${product.price}</p>
                <p>{product.description}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  )
}

export default Pricing
