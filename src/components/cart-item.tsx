import { Image, Pressable, StyleSheet, View } from 'react-native';

import { MinusCircle } from '../assets/icons/minus-circle';
import { PlusCircle } from '../assets/icons/plus-circle';

import { defaultImageHost } from '../env';

import type { Item } from '../types/cart';
import type { Product } from '../types/product';

import { formatToCurrency } from '../utils/number-format';

import { Text } from './text';

interface CartItemProps {
  item: Item;
  onAdd: (product: Product) => void;
  onRemove: (product: Product) => void;
}

export function CartItem({ item, onAdd, onRemove }: CartItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.product}>
        <Image
          source={{
            uri: `${defaultImageHost}/${item.product.imagePath}`,
            width: 48,
            height: 40,
          }}
          style={styles.image}
        />

        <Text size={14} color="#999999">
          {item.quantity}x
        </Text>

        <View style={styles.details}>
          <Text weight="600" size={14}>
            {item.product.name}
          </Text>
          <Text size={14} color="#666666">
            {formatToCurrency(item.product.price)}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <Pressable
          onPress={() => onAdd(item.product)}
          style={({ pressed }) => [
            styles.actionButton,
            { opacity: pressed ? 0.5 : 1 },
          ]}
        >
          <PlusCircle />
        </Pressable>

        <Pressable
          onPress={() => onRemove(item.product)}
          style={({ pressed }) => [
            styles.actionButton,
            { opacity: pressed ? 0.5 : 1 },
          ]}
        >
          <MinusCircle />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    paddingVertical: 8,
  },
  product: {
    flexDirection: 'row',
    gap: 12,
  },
  image: {
    width: 48,
    height: 40,
    borderRadius: 6,
  },
  details: {
    gap: 4,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionButton: {
    padding: 4,
  },
});
