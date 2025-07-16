import { StyleSheet, View, type ViewStyle } from 'react-native';

import { Text } from './text';

interface TextCardProps {
  label: string;
  icon?: string;
  style?: ViewStyle;
}

export function TextCard({ label, icon, style }: TextCardProps) {
  return (
    <View style={[styles.container, style]}>
      {icon && <Text>{icon}</Text>}

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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
});
