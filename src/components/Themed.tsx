/**
 * Themed components using Tamagui's theme system
 */
import {
  SafeAreaView as DefaultSafeAreaView,
  SafeAreaViewProps
} from "react-native-safe-area-context";
import {
  ScrollView as DefaultScrollView,
  Text as DefaultText,
  View as DefaultView,
  useTheme,
  type ScrollViewProps,
  type TextProps,
  type ViewProps
} from "tamagui";

export function Text(props: TextProps) {
  return <DefaultText color="$color" {...props} />;
}

export function View(props: ViewProps) {
  return <DefaultView bg="$background" {...props} />;
}

export function ScrollView(props: ScrollViewProps) {
  return <DefaultScrollView bg="$background" {...props} />;
}

export function SafeAreaView(props: SafeAreaViewProps) {
  const { style, ...rest } = props;

  const theme = useTheme();

  return (
    <DefaultSafeAreaView
      style={[{ flex: 1, backgroundColor: theme.background.val }, style]}
      {...rest}
    />
  );
}
