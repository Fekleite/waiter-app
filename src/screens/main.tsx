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

import { products } from '../mocks/products';
import type { Item } from '../types/cart';

export function Main() {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [isNewOrderModalVisible, setIsNewOrderModalVisible] = useState(false);
  const [cartItems, setCartItems] = useState<Item[]>([
    {
      product: products[0],
      quantity: 2,
    },
    {
      product: products[1],
      quantity: 1,
    },
  ]);

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
          <Menu />
        </View>
      </Container>

      <Container style={styles.footerContainer}>
        {!selectedTable && <Footer onCreateOrder={handleOpenNewOrderModal} />}

        {selectedTable && <Cart items={cartItems} />}

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
