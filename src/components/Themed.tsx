/**
 * Themed components using Tamagui's theme system
 */
import {
  ScrollView as DefaultScrollView,
  Text as DefaultText,
  View as DefaultView,
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
