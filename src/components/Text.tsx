import {
  Text as NativeText,
  type TextProps as NativeTextProps,
} from 'react-native';

interface TextProps extends NativeTextProps {
  weight?: '400' | '600' | '700';
  color?: string;
  size?: number;
  opacity?: number;
}

export function Text({
  weight,
  color,
  size,
  opacity,
  children,
  ...props
}: TextProps) {
  return (
    <NativeText
      style={{
        fontFamily: weight ? `GeneralSans${weight}` : 'GeneralSans400',
        color: color ?? '#333',
        fontSize: size ?? 16,
        opacity: opacity ?? 1,
      }}
      {...props}
    >
      {children}
    </NativeText>
  );
}
