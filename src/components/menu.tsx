import { useState } from 'react';
import { FlatList } from 'react-native';

import { products } from '../mocks/products';
import type { Product } from '../types/product';

import { ProductDetailsModal } from './product-details-modal';
import { ProductItem } from './product-item';
import { Separator } from './separator';

interface MenuProps {
  onAddToCart: (product: Product) => void;
}

export function Menu({ onAddToCart }: MenuProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductDetailsModalVisible, setProductDetailsModalVisible] =
    useState(false);

  function handleSeeProductDetails(product: Product) {
    setSelectedProduct(product);
    setProductDetailsModalVisible(true);
  }

  function handleCloseProductDetailModal() {
    setProductDetailsModalVisible(false);
  }

  return (
    <>
      <FlatList
        data={products}
        keyExtractor={(product) => product._id}
        renderItem={({ item }) => (
          <ProductItem
            product={item}
            onSeeDetails={handleSeeProductDetails}
            onAddToCart={onAddToCart}
          />
        )}
        ItemSeparatorComponent={Separator}
      />

      <ProductDetailsModal
        visible={isProductDetailsModalVisible}
        onRequestClose={handleCloseProductDetailModal}
        onClose={handleCloseProductDetailModal}
        product={selectedProduct}
        onAddToCart={onAddToCart}
      />
    </>
  );
}
