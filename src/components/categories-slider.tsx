import { useState } from 'react';
import { FlatList } from 'react-native';

import type { Category as CategoryType } from '../types/category';

import { Category } from './category';

interface CategorySliderProps {
  categories: CategoryType[];
}

export function CategorySlider({ categories }: CategorySliderProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  function handleSelectCategory(category: string) {
    setSelectedCategory((prevState) =>
      prevState === category ? null : category,
    );
  }

  if (categories.length === 0) {
    return null;
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
