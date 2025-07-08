import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { Text } from '../components/Text';

export function Main() {
  const isAndroid = Platform.OS === 'android';
  const statusBarHeight = StatusBar.currentHeight;

  return (
    <SafeAreaView
      style={[
        styles.container,
        isAndroid && statusBarHeight ? { marginTop: statusBarHeight } : {},
      ]}
    >
      <Text weight="700">Hello Native World!</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
