import {
  ActivityIndicator,
  Pressable,
  type PressableProps,
  StyleSheet,
} from 'react-native';
import { Text } from './text';

interface ButtonProps extends PressableProps {
  children: string;
  loading?: boolean;
}

export function Button({ children, disabled, loading, ...props }: ButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { opacity: pressed ? 0.8 : 1 },
        { backgroundColor: disabled ? '#cccccc' : '#d73035' },
      ]}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color="#ffffff" />
      ) : (
        <Text color="#ffffff" weight="600">
          {children}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
