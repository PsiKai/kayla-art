import { Router, json } from "express"
import Product from "../../db/models/product"

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

export default productRouter
