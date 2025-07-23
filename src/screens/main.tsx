import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Cart } from '../components/cart';
import { CategorySlider } from '../components/categories-slider';
import { Container } from '../components/container';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { Loading } from '../components/loading';
import { Menu } from '../components/menu';
import { NewOrderModal } from '../components/new-order-modal';
import { OrderHeader } from '../components/order-header';

import type { Item } from '../types/cart';
import type { Category } from '../types/category';
import type { Product } from '../types/product';
import { api } from '../services/api';

export function Main() {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [isNewOrderModalVisible, setIsNewOrderModalVisible] = useState(false);
  const [cartItems, setCartItems] = useState<Item[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  function getCategoriesAndProducts() {
    Promise.all([
      api.get<Category[]>('/categories'),
      api.get<Product[]>('/products'),
    ]).then(([categoriesResponse, productsResponse]) => {
      setCategories(categoriesResponse.data);
      setProducts(productsResponse.data);
    }).catch((error) => {
      // TODO: Handle error appropriately
      console.error('Error fetching data:', error);
    }).finally(() => {
      setIsLoading(false);
    })
  }

  useEffect(() => {
    getCategoriesAndProducts();
  }, [])

  function handleSaveOrderTable(table: string) {
    setSelectedTable(table);
  }

  function handleOpenNewOrderModal() {
    setIsNewOrderModalVisible(true);
  }

  function handleCloseNewOrderModal() {
    setIsNewOrderModalVisible(false);
  }

  function handleResetOrderData() {
    setSelectedTable(null);
    setCartItems([]);
  }

  function handleAddToCart(product: Product) {
    if (!selectedTable) {
      setIsNewOrderModalVisible(true);
    }

    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (cartItem) => cartItem.product._id === product._id,
      );

      const existingItem = prevItems[existingItemIndex];
      const updatedItems = [...prevItems];

      if (existingItemIndex < 0) {
        return updatedItems.concat({ product, quantity: 1 });
      }

      updatedItems[existingItemIndex] = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };

      return updatedItems;
    });
  }

  function handleRemoveFromCart(product: Product) {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (cartItem) => cartItem.product._id === product._id,
      );

      const existingItem = prevItems[existingItemIndex];
      const updatedItems = [...prevItems];

      if (existingItem.quantity === 1) {
        return updatedItems.filter((item) => item.product._id !== product._id);
      }

      updatedItems[existingItemIndex] = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };

      return updatedItems;
    });
  }

  return (
    <>
      <Container style={styles.container} withStatusBar>
        {selectedTable ? (
          <OrderHeader
            onCancelOrder={handleResetOrderData}
            tableNumber={selectedTable}
          />
        ) : (
          <Header />
        )}

        {isLoading ? (
          <Loading />
        ) : (
          <>
            <View>
              <CategorySlider categories={categories} />
            </View>

            <View style={styles.menu}>
              <Menu products={products} onAddToCart={handleAddToCart} />
            </View>
          </>
        )}
      </Container>

      <Container style={styles.footerContainer}>
        {selectedTable ? (
          <Cart
            items={cartItems}
            onAdd={handleAddToCart}
            onRemove={handleRemoveFromCart}
            onResetOrder={handleResetOrderData}
          />
        ) : (
          <Footer
            onCreateOrder={handleOpenNewOrderModal}
            isDataLoading={isLoading}
          />
        )}

        <NewOrderModal
          visible={isNewOrderModalVisible}
          onSave={handleSaveOrderTable}
          onClose={handleCloseNewOrderModal}
          onRequestClose={handleCloseNewOrderModal}
        />
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 32,
    paddingHorizontal: 24,
    backgroundColor: '#fafafa',
  },
  menu: {
    flex: 1,
  },
  footerContainer: {
    backgroundColor: '#ffffff',
    elevation: 2,
  },
});
