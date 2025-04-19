import { TProductForm } from "./ProductForm"

export const subCategoriesMap: Record<string, string[]> = {
  photography: ["portraits", "pets", "creative"],
  illustration: ["portraits", "creative"],
}

export const baseForm: TProductForm = {
  category: "",
  serviceName: "",
  price: "",
  size: "",
  description: "",
}
