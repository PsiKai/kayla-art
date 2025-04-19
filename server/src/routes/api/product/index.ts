import { Router, json } from "express"
import Product from "../../../db/models/product"
import { isAuthenticated } from "../../../middleware/auth"

const productRouter = Router()
productRouter.use(json())

productRouter.get("/", async (_req, res) => {
  try {
    const products = await Product.find({})
    res.json({ resources: products })
  } catch (error) {
    console.error(error)
    res.status(500).send("Error getting products")
  }
})

productRouter.post("/", isAuthenticated, async (req, res) => {
  console.log(req.body)
  try {
    const product = new Product(req.body)
    await product.save()
    res.json({ data: product })
  } catch (error) {
    console.error(error)
    res.status(500).send("Error creating product")
  }
})

productRouter.put("/:_id", isAuthenticated, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params._id, req.body, { new: true })
    res.json({ data: product })
  } catch (error) {
    console.error(error)
    res.status(500).send("Error updating product")
  }
})

productRouter.delete("/:_id", isAuthenticated, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params._id)
    res.json({ message: "Product deleted" })
  } catch (error) {
    console.error(error)
    res.status(500).send("Error deleting product")
  }
})

export default productRouter
