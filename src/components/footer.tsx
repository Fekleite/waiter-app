import { StyleSheet, View } from 'react-native';
import { Button } from './button';

interface FooterProps {
  handleNewOrder: () => void;
}

export function Footer({ handleNewOrder }: FooterProps) {
  return (
    <View style={styles.container}>
      <Button onPress={handleNewOrder}>Novo pedido</Button>
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
