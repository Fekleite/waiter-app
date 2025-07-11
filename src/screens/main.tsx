import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { Header } from '../components/header';

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
      <Header />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
});
