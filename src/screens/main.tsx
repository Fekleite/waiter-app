import { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';

import { CategorySlider } from '../components/categories-slider';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { Menu } from '../components/menu';
import { NewOrderModal } from '../components/new-order-modal';
import { TextCard } from '../components/text-card';

import { isAndroid } from '../utils/platform';

export function Main() {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [isNewOrderModalVisible, setIsNewOrderModalVisible] = useState(false);

  const statusBarHeight = StatusBar.currentHeight ?? 0;

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

        {selectedTable && <TextCard label={`Mesa ${selectedTable}`} />}

        <View>
          <CategorySlider />
        </View>

        <View style={styles.menuContainer}>
          <Menu />
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
