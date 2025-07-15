import { useState } from 'react';
import { FlatList } from 'react-native';

import { categories } from '../mocks/categories';

import { Category } from './category';

export function CategorySlider() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  function handleSelectCategory(category: string) {
    setSelectedCategory((prevState) =>
      prevState === category ? null : category,
    );
  }

  return (
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
  );
}
