// Fallback for using MaterialIcons on Android and web.

import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolViewProps, SymbolWeight } from "expo-symbols";
import { ComponentProps } from "react";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";

type IconMapping = Record<
  SymbolViewProps["name"],
  ComponentProps<typeof MaterialIcons>["name"]
>;

type FontAwesomeMapping = Record<
  string,
  ComponentProps<typeof FontAwesome>["name"]
>;

type IconSymbolName = keyof typeof MAPPING | keyof typeof FONTAWESOME_MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  "house.fill": "home",
  "paperplane.fill": "send",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.left": "chevron-left",
  "chevron.right": "chevron-right",
  // Chat and Messages icons
  "arrow.left": "arrow-back",
  magnifyingglass: "search",
  camera: "camera-alt",
  photo: "image",
  pencil: "edit",
  "message.fill": "message",
  // Tab navigation icons
  globe: "public",
  "person.2.fill": "people",
  "chart.bar.fill": "bar-chart",
  // Calendar icon
  "calendar.days": "event",
  // Sports icons
  sportscourt: "sports-cricket",
  soccerball: "sports-soccer",
  tennisball: "sports-tennis",
  "chevron.up": "keyboard-arrow-up",
  "chevron.down": "keyboard-arrow-down",
} as IconMapping;

/**
 * FontAwesome icon mappings
 */
const FONTAWESOME_MAPPING = {
  "dot-circle-o": "dot-circle-o",
} as FontAwesomeMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 * FontAwesome icons are also supported for specific icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  // Check if it's a FontAwesome icon
  if (name in FONTAWESOME_MAPPING) {
    return (
      <FontAwesome
        color={color}
        size={size}
        name={FONTAWESOME_MAPPING[name as keyof typeof FONTAWESOME_MAPPING]}
        style={style}
      />
    );
  }

  // Default to Material Icons
  return (
    <MaterialIcons
      color={color}
      size={size}
      name={MAPPING[name as keyof typeof MAPPING]}
      style={style}
    />
  );
}
