import { useMemo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import type { Item } from '../types/cart';
import type { Product } from '../types/product';

import { formatToCurrency } from '../utils/number-format';

import { Button } from './button';
import { CartItem } from './cart-item';
import { Text } from './text';

interface CartProps {
  items: Item[];
  onAdd: (product: Product) => void;
  onRemove: (product: Product) => void;
}

export function Cart({ items, onAdd, onRemove }: CartProps) {
  const isEmpty = items.length === 0;

  const total = useMemo(() => {
    return items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  }, [items]);

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.product._id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <CartItem item={item} onAdd={onAdd} onRemove={onRemove} />
        )}
        style={styles.cartList}
      />

      <View style={styles.footer}>
        {!isEmpty ? (
          <View>
            <Text color="#666666">Total</Text>

            <Text weight="600" size={18}>
              {formatToCurrency(total)}
            </Text>
          </View>
        ) : (
          <View style={styles.emptyCart}>
            <Text color="#999999">Seu carrinho está vazio</Text>
          </View>
        )}

        <Button disabled={isEmpty}>Confirmar pedido</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    minHeight: 72,
  },
  cartList: {
    maxHeight: 144,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  emptyCart: {
    flex: 1,
    maxWidth: 120,
  },
});
