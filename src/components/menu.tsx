import { FlatList } from 'react-native';

import { products } from '../mocks/products';

import { ProductItem } from './product-item';
import { Separator } from './separator';

export function Menu() {
  return (
    <FlatList
      data={products}
      keyExtractor={(product) => product._id}
      renderItem={({ item }) => <ProductItem product={item} />}
      ItemSeparatorComponent={Separator}
    />
  );
}
