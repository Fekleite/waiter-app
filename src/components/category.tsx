import {
  Platform,
  Pressable,
  type PressableProps,
  StyleSheet,
  View,
} from 'react-native';

import { Text } from './text';

interface CategoryProps extends PressableProps {
  category: {
    _id: string;
    name: string;
    icon: string;
  };
  isActive: boolean;
}

export function Category({ category, isActive, ...props }: CategoryProps) {
  const isAndroid = Platform.OS === 'android';

  return (
    <Pressable
      style={({ pressed }) => [
        { opacity: pressed ? 0.5 : 1 },
        styles.container,
      ]}
      {...props}
    >
      {/* The elevation prop is not customizable so I create a view shadow */}
      {isAndroid && <View style={styles.shadow} />}

      <View style={styles.iconContainer}>
        <Text opacity={isActive ? 1 : 0.5}>{category.icon}</Text>
      </View>

      <Text size={14} weight="600" opacity={isActive ? 1 : 0.5}>
        {category.name}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    gap: 8,
    alignItems: 'center',
    marginRight: 12,
    minWidth: 80,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 100,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 1,
  },
  shadow: {
    position: 'absolute',
    width: 52,
    height: 52,
    borderRadius: 100,
    backgroundColor: '#000000',
    opacity: 0.1,
    top: 2,
    zIndex: -1,
  },
});
