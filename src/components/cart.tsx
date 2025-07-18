import { useMemo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import type { Item } from '../types/cart';
import { formatToCurrency } from '../utils/number-format';
import { Button } from './button';
import { CartItem } from './cart-item';
import { Text } from './text';

interface CartProps {
  items: Item[];
}

export function Cart({ items }: CartProps) {
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
        renderItem={({ item }) => <CartItem item={item} />}
      />

      <View style={styles.footer}>
        <View>
          <Text color="#666666">Total</Text>

          <Text weight="600" size={18}>
            {formatToCurrency(total)}
          </Text>
        </View>

        <Button>Confirmar pedido</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    minHeight: 110,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
});
