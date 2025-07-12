import { View } from 'react-native';

interface SeparatorProps {
  height?: number;
  spacing?: number;
  color?: string;
}

export function Separator({
  height = 1,
  spacing = 24,
  color = '#CCCCCC',
}: SeparatorProps) {
  return (
    <View
      style={{
        height,
        marginVertical: spacing,
        backgroundColor: color,
        opacity: 0.3,
      }}
    />
  );
}
