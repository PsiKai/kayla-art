import NewProduct from "./form/NewProduct"
import AdminProducts from "./layout/AdminProducts"

function AdminPricing() {
  return (
    <div style={{ position: "relative", minHeight: "100px" }}>
      <h3>Manage your products</h3>
      <NewProduct />
      <AdminProducts />
    </div>
  )
}

export default AdminPricing
