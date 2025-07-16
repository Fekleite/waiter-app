import { SafeAreaView, StatusBar, type ViewProps } from 'react-native';
import { isAndroid } from '../utils/platform';

interface ContainerProps extends ViewProps {
  withStatusBar?: boolean;
}

export function Container({
  children,
  style,
  withStatusBar = false,
  ...props
}: ContainerProps) {
  const statusBarHeight = StatusBar.currentHeight ?? 0;

  return (
    <SafeAreaView
      style={[
        style,
        isAndroid && statusBarHeight && withStatusBar
          ? { marginTop: statusBarHeight }
          : {},
      ]}
      {...props}
    >
      {children}
    </SafeAreaView>
  );
}
