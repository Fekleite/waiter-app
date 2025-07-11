import { StyleSheet, View } from 'react-native';
import { Button } from './button';

export function Footer() {
  return (
    <View style={styles.container}>
      <Button>Novo pedido</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
});
