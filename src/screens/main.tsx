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
import { Header } from '../components/header';

import { categories } from '../mocks/categories';

export function Main() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const isAndroid = Platform.OS === 'android';
  const statusBarHeight = StatusBar.currentHeight;

  function handleSelectCategory(categoryId: string) {
    setSelectedCategory((prevState) =>
      prevState === categoryId ? null : categoryId,
    );
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        isAndroid && statusBarHeight ? { marginTop: statusBarHeight } : {},
      ]}
    >
      <Header />

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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 32,
    paddingHorizontal: 24,
    backgroundColor: '#fafafa',
  },
});
