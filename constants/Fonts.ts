import { Platform } from "react-native";

export const Fonts = {
  // Lexend font family with system fallbacks
  lexend: {
    thin: Platform.select({
      ios: "System",
      android: "sans-serif-thin",
      default: "System",
    }),
    extraLight: Platform.select({
      ios: "System",
      android: "sans-serif-light",
      default: "System",
    }),
    light: Platform.select({
      ios: "System",
      android: "sans-serif-light",
      default: "System",
    }),
    regular: Platform.select({
      ios: "System",
      android: "sans-serif",
      default: "System",
    }),
    medium: Platform.select({
      ios: "System",
      android: "sans-serif-medium",
      default: "System",
    }),
    semiBold: Platform.select({
      ios: "System",
      android: "sans-serif-medium",
      default: "System",
    }),
    bold: Platform.select({
      ios: "System",
      android: "sans-serif",
      default: "System",
    }),
    extraBold: Platform.select({
      ios: "System",
      android: "sans-serif",
      default: "System",
    }),
    black: Platform.select({
      ios: "System",
      android: "sans-serif",
      default: "System",
    }),
  },

  // Noto Sans font family with system fallbacks
  notoSans: {
    thin: Platform.select({
      ios: "System",
      android: "sans-serif-thin",
      default: "System",
    }),
    extraLight: Platform.select({
      ios: "System",
      android: "sans-serif-light",
      default: "System",
    }),
    light: Platform.select({
      ios: "System",
      android: "sans-serif-light",
      default: "System",
    }),
    regular: Platform.select({
      ios: "System",
      android: "sans-serif",
      default: "System",
    }),
    medium: Platform.select({
      ios: "System",
      android: "sans-serif-medium",
      default: "System",
    }),
    semiBold: Platform.select({
      ios: "System",
      android: "sans-serif-medium",
      default: "System",
    }),
    bold: Platform.select({
      ios: "System",
      android: "sans-serif",
      default: "System",
    }),
    extraBold: Platform.select({
      ios: "System",
      android: "sans-serif",
      default: "System",
    }),
    black: Platform.select({
      ios: "System",
      android: "sans-serif",
      default: "System",
    }),
  },

  // Space Mono (existing font)
  spaceMono: {
    regular: Platform.select({
      ios: "SpaceMono-Regular",
      android: "SpaceMono-Regular",
      default: "SpaceMono-Regular",
    }),
  },

  // System font fallbacks
  system: {
    thin: Platform.select({
      ios: "System",
      android: "sans-serif-thin",
      default: "System",
    }),
    light: Platform.select({
      ios: "System",
      android: "sans-serif-light",
      default: "System",
    }),
    regular: Platform.select({
      ios: "System",
      android: "sans-serif",
      default: "System",
    }),
    medium: Platform.select({
      ios: "System",
      android: "sans-serif-medium",
      default: "System",
    }),
    semiBold: Platform.select({
      ios: "System",
      android: "sans-serif-medium",
      default: "System",
    }),
    bold: Platform.select({
      ios: "System",
      android: "sans-serif",
      default: "System",
    }),
  },
};

// Font weights for easy reference
export const FontWeights = {
  thin: "100",
  extraLight: "200",
  light: "300",
  regular: "400",
  medium: "500",
  semiBold: "600",
  bold: "700",
  extraBold: "800",
  black: "900",
} as const;
