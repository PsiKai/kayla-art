import { Request, Response, Router, json } from "express"
import Product, { TProduct } from "../../../db/models/product"
import { isAuthenticated } from "../../../middleware/auth"

type TProductRequest<TParams extends Record<string, string> = Record<string, string>> = Request<
  TParams,
  object,
  TProduct
>

type TProductResponse = Response<
  | { newProduct: TProduct }
  | { resources: TProduct[] }
  | { data: TProduct[] }
  | { message: string }
  | { data: TProduct }
>

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

productRouter.put("/:_id", isAuthenticated, async (req: TProductRequest, res: TProductResponse) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params._id, req.body, { new: true })
    if (!product) {
      res.status(404).json({ message: "Product not found" })
      return
    }
    res.json({ data: product })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error updating product" })
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
