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
import { getCategories } from '../services/categories/get-categories';
import { getProducts } from '../services/products/get-products';
import { getProductsByCategory } from '../services/products/get-products-by-category';
import type { Item } from '../types/cart';
import type { Category } from '../types/category';
import type { Product } from '../types/product';

export function Main() {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [isNewOrderModalVisible, setIsNewOrderModalVisible] = useState(false);
  const [cartItems, setCartItems] = useState<Item[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProductsLoading, setIsProductsLoading] = useState(false);

  useEffect(() => {
    Promise.all([getCategories(), getProducts()])
      .then(([categoriesResponse, productsResponse]) => {
        setCategories(categoriesResponse.data);
        setProducts(productsResponse.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

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

  async function handleGetProductsByCategory(categoryId: string | null) {
    setIsProductsLoading(true);

    if (categoryId) {
      const { data } = await getProductsByCategory({ categoryId });

      setProducts(data);
    } else {
      const { data } = await getProducts();

      setProducts(data);
    }

    setIsProductsLoading(false);
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
              <CategorySlider
                categories={categories}
                onSelectCategory={handleGetProductsByCategory}
              />
            </View>

            {isProductsLoading ? (
              <Loading />
            ) : (
              <View style={styles.menu}>
                <Menu products={products} onAddToCart={handleAddToCart} />
              </View>
            )}
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
            shouldDisabledButton={isLoading || isProductsLoading}
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
