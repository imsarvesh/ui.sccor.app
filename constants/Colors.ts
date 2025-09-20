/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

// Bright blue from the logo
const primaryBlue = "#0066FF";
const primaryBlueLight = "#3385FF";

const tintColorLight = primaryBlue;
const tintColorDark = primaryBlueLight;

export const Colors = {
  light: {
    text: "#1A1A1A",
    background: "#FFFFFF",
    tint: tintColorLight,
    icon: "#666666",
    tabIconDefault: "#999999",
    tabIconSelected: tintColorLight,
    // Chat and Messages specific colors
    primaryText: "#1A1A1A",
    secondaryText: "#666666",
    backgroundPrimary: "#FFFFFF",
    backgroundSecondary: "#F8F9FA",
    userMessage: primaryBlue, // Blue background for user messages
    userMessageText: "#FFFFFF", // White text for user messages
    otherMessage: "#F0F2F5",
    otherMessageText: "#1A1A1A", // Dark text for other messages
    border: "#E5E7EB",
    placeholder: "#999999", // Placeholder text color for inputs
  },
  dark: {
    text: "#FFFFFF",
    background: "#0F0F0F",
    tint: tintColorDark,
    icon: "#CCCCCC",
    tabIconDefault: "#666666",
    tabIconSelected: tintColorDark,
    // Chat and Messages specific colors
    primaryText: "#FFFFFF",
    secondaryText: "#CCCCCC",
    backgroundPrimary: "#0F0F0F",
    backgroundSecondary: "#1A1A1A",
    userMessage: primaryBlue, // Blue background for user messages
    userMessageText: "#FFFFFF", // White text for user messages
    otherMessage: "#2A2A2A",
    otherMessageText: "#FFFFFF", // White text for other messages
    border: "#333333",
    placeholder: "#666666", // Placeholder text color for inputs
  },
};
