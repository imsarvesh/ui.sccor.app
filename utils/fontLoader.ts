import * as Font from "expo-font";

export const loadFonts = async () => {
  const fontMap: { [key: string]: any } = {};

  // Only load fonts that actually exist and are valid
  // Using static require statements as required by React Native
  try {
    // Only load SpaceMono since it's the only working font
    fontMap[
      "SpaceMono-Regular"
    ] = require("../assets/fonts/SpaceMono-Regular.ttf");
  } catch {
    console.warn("SpaceMono font file not found or invalid");
  }

  try {
    if (Object.keys(fontMap).length > 0) {
      await Font.loadAsync(fontMap);
    } else {
      console.log("No valid font files found, using system fonts");
    }
  } catch (error) {
    console.error("Error loading fonts:", error);
    console.log("Using system fonts as fallback");
  }
};
