import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from './text';
import { TextCard } from './text-card';

interface OrderHeaderProps {
  onCancelOrder: () => void;
  tableNumber: string;
}

export function OrderHeader({ onCancelOrder, tableNumber }: OrderHeaderProps) {
  return (
    <View>
      <View style={styles.header}>
        <Text size={24} weight="600">
          Pedido
        </Text>

        <Pressable onPress={onCancelOrder}>
          <Text size={14} weight="600" color="#D73035">
            cancelar pedido
          </Text>
        </Pressable>
      </View>

      <TextCard label={`Mesa ${tableNumber}`} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
});
