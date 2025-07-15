import { StyleSheet, View } from 'react-native';

import { Text } from './text';

interface SelectedTableProps {
  table: string;
}

export function SelectedTable({ table }: SelectedTableProps) {
  return (
    <View style={styles.container}>
      <Text size={14}>Mesa {table}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCCCCC4D',
  },
});
