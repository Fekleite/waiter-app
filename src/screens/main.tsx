import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Cart } from '../components/cart';
import { CategorySlider } from '../components/categories-slider';
import { Container } from '../components/container';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { Menu } from '../components/menu';
import { NewOrderModal } from '../components/new-order-modal';
import { OrderHeader } from '../components/order-header';

import type { Item } from '../types/cart';
import type { Product } from '../types/product';

export function Main() {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [isNewOrderModalVisible, setIsNewOrderModalVisible] = useState(false);
  const [cartItems, setCartItems] = useState<Item[]>([]);

  function handleSaveOrderTable(table: string) {
    setSelectedTable(table);
  }

  function handleOpenNewOrderModal() {
    setIsNewOrderModalVisible(true);
  }

  function handleCloseNewOrderModal() {
    setIsNewOrderModalVisible(false);
  }

  function handleCancelOrder() {
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
            onCancelOrder={handleCancelOrder}
            tableNumber={selectedTable}
          />
        ) : (
          <Header />
        )}

        <View>
          <CategorySlider />
        </View>

        <View style={styles.menu}>
          <Menu onAddToCart={handleAddToCart} />
        </View>
      </Container>

      <Container style={styles.footerContainer}>
        {!selectedTable && <Footer onCreateOrder={handleOpenNewOrderModal} />}

        {selectedTable && (
          <Cart
            items={cartItems}
            onAdd={handleAddToCart}
            onRemove={handleRemoveFromCart}
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
