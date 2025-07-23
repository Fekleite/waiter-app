import { Product } from "../../types/product";
import { api } from "../api";

export async function getProductsByCategory({ categoryId }: { categoryId: string }) {
  return api.get<Product[]>(`/categories/${categoryId}/products`);
}
