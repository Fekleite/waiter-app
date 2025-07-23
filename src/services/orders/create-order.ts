import { api } from '../api';

interface CreateOrderRequest {
  body: {
    table: string;
    products: {
      product: string;
      quantity: number;
    }[];
  };
}

export async function createOrder({ body }: CreateOrderRequest) {
  return api.post('/orders', body);
}
