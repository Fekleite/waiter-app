import { StyleSheet, View } from 'react-native';
import { Text } from './text';

export function Header() {
  return (
    <View style={styles.container}>
      <Text size={14} opacity={0.9}>
        Bem-vindo(a) ao
      </Text>
      <Text size={24} weight="700">
        WAITER
        <Text size={24}>APP</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 4,
    paddingTop: 20,
  },
});
