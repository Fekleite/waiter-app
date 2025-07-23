import { StyleSheet, View } from 'react-native';
import { Button } from './button';

interface FooterProps {
  onCreateOrder: () => void;
  isDataLoading?: boolean;
}

export function Footer({ onCreateOrder, isDataLoading }: FooterProps) {
  return (
    <View style={styles.container}>
      <Button onPress={onCreateOrder} disabled={isDataLoading}>
        Novo pedido
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    minHeight: 110,
  },
});
