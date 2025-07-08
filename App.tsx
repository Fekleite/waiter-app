import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [isFontsLoaded] = useFonts({
    GeneralSans400: require("./src/assets/fonts/GeneralSans-Regular.otf"),
    GeneralSans600: require("./src/assets/fonts/GeneralSans-Semibold.otf"),
    GeneralSans700: require("./src/assets/fonts/GeneralSans-Bold.otf")
  })

  if (!isFontsLoaded) {
    return null;
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Text style={{fontFamily: 'GeneralSans700'}}>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
