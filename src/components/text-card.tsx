import { StyleSheet, View } from 'react-native';

import { Text } from './text';

interface TextCardProps {
  label: string;
}

export function TextCard({ label }: TextCardProps) {
  return (
    <View style={styles.container}>
      <Text size={14}>{label}</Text>
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
