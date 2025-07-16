import { Image, Pressable, StyleSheet, View } from 'react-native';

import { PlusCircle } from '../assets/icons/plus-circle';
import { defaultImageHost } from '../env';
import type { Product } from '../types/product';
import { formatToCurrency } from '../utils/number-format';

import { Text } from './text';

interface ProductItemProps {
  product: Product;
  onSeeDetails: (product: Product) => void;
}

export function ProductItem({ product, onSeeDetails }: ProductItemProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { opacity: pressed ? 0.8 : 1 },
      ]}
      onPress={() => onSeeDetails(product)}
    >
      <Image
        source={{
          uri: `${defaultImageHost}/${product.imagePath}`,
          width: 120,
          height: 96,
        }}
        style={styles.image}
      />

      <View style={styles.details}>
        <Text weight="600">{product.name}</Text>

        <Text size={14} color="#666666">
          {product.description}
        </Text>

        <Text weight="600">{formatToCurrency(product.price)}</Text>
      </View>

      <Pressable style={styles.addButton}>
        <PlusCircle />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  details: {
    flex: 1,
    gap: 8,
  },
  image: {
    borderRadius: 8,
  },
  addButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
