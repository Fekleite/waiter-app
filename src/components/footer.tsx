import { StyleSheet, View } from 'react-native';
import { Button } from './button';

interface FooterProps {
  onCreateOrder: () => void;
  shouldDisabledButton?: boolean;
}

export function Footer({ onCreateOrder, shouldDisabledButton }: FooterProps) {
  return (
    <View style={styles.container}>
      <Button onPress={onCreateOrder} disabled={shouldDisabledButton}>
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
