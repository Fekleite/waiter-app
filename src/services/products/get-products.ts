import type { Product } from '../../types/product';
import { api } from '../api';

export async function getProducts() {
  return api.get<Product[]>('/products');
}
