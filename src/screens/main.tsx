import { useState } from 'react';
import {
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import { Category } from '../components/category';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { NewOrderModal } from '../components/new-order-modal';
import { ProductItem } from '../components/product-item';
import { Separator } from '../components/separator';
import { Text } from '../components/text';
import { categories } from '../mocks/categories';
import { products } from '../mocks/products';

export function Main() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [isNewOrderModalVisible, setIsNewOrderModalVisible] = useState(false);

  const isAndroid = Platform.OS === 'android';
  const statusBarHeight = StatusBar.currentHeight ?? 0;

  function handleSelectCategory(categoryId: string) {
    setSelectedCategory((prevState) =>
      prevState === categoryId ? null : categoryId,
    );
  }

  function handleSaveOrderTable(table: string) {
    setSelectedTable(table);
  }

  function handleOpenNewOrderModal() {
    setIsNewOrderModalVisible(true);
  }

  function handleCloseNewOrderModal() {
    setIsNewOrderModalVisible(false);
  }

  return (
    <>
      <SafeAreaView
        style={[
          styles.container,
          isAndroid && statusBarHeight ? { marginTop: statusBarHeight } : {},
        ]}
      >
        <Header />

        {selectedTable && <Text>{`Mesa ${selectedTable} selecionada`}</Text>}

        <View>
          <FlatList
            data={categories}
            keyExtractor={(category) => category._id}
            renderItem={({ item }) => (
              <Category
                onPress={() => handleSelectCategory(item._id)}
                category={item}
                isActive={selectedCategory === item._id}
              />
            )}
            contentContainerStyle={{ paddingRight: 24 }}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        </View>

        <View style={styles.menuContainer}>
          <FlatList
            data={products}
            keyExtractor={(product) => product._id}
            renderItem={({ item }) => <ProductItem product={item} />}
            ItemSeparatorComponent={Separator}
          />
        </View>
      </SafeAreaView>

      <SafeAreaView style={styles.footerContainer}>
        <Footer handleNewOrder={handleOpenNewOrderModal} />

        <NewOrderModal
          visible={isNewOrderModalVisible}
          onSave={handleSaveOrderTable}
          onClose={handleCloseNewOrderModal}
          onRequestClose={handleCloseNewOrderModal}
        />
      </SafeAreaView>
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
  menuContainer: {
    flex: 1,
  },
  footerContainer: {
    backgroundColor: '#ffffff',
  },
});
