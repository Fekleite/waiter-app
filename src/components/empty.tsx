import { StyleSheet, View } from 'react-native';

import { Empty as EmptyImg } from '../assets/icons/empty';
import { Text } from './text';

interface EmptyProps {
  message?: string;
}

export function Empty({ message }: EmptyProps) {
  return (
    <View style={styles.container}>
      <EmptyImg />

      {message && <Text color="#666666">{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
});
