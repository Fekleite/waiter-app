import type { Category } from '../../types/category';
import { api } from '../api';

export async function getCategories() {
  return api.get<Category[]>('/categories');
}
