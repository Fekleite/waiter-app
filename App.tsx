import { useFonts } from 'expo-font';
import { Main } from './src/ui/Main';
import { StatusBar } from 'expo-status-bar';

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
    <>
      <StatusBar />

      <Main />
    </>
  );
}
