import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "../components/ui";
export default function LandingScreen() {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");
  const borderColor = useThemeColor({}, "border");

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: backgroundColor,
      justifyContent: "space-between",
    },
    header: {
      backgroundColor: backgroundColor,
      paddingHorizontal: 16,
      paddingBottom: 8,
    },
    headerContent: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    headerTitle: {
      flex: 1,
      textAlign: "center",
      fontSize: 18,
      fontWeight: "bold",
      color: textColor,
      lineHeight: 22,
      letterSpacing: -0.015,
      paddingLeft: 48, // pl-12 equivalent
    },
    trophyButton: {
      width: 48, // w-12 equivalent
      height: 48, // h-12 equivalent
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "transparent",
      borderRadius: 8, // rounded-lg equivalent
    },
    content: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 16,
    },
    logoContainer: {
      alignItems: "center",
      marginBottom: 40,
    },
    logo: {
      width: 120,
      height: 120,
      resizeMode: "contain",
    },
    mainTitle: {
      fontSize: 28,
      fontWeight: "bold",
      color: textColor,
      textAlign: "center",
      lineHeight: 32,
      letterSpacing: -0.015,
      marginBottom: 24,
      marginTop: 20,
    },
    loaderContainer: {
      paddingVertical: 20,
      alignItems: "center",
    },
    loaderText: {
      fontSize: 14,
      color: textColor,
      opacity: 0.7,
      marginTop: 8,
    },
    bottomNav: {
      borderTopWidth: 1,
      borderTopColor: borderColor,
      backgroundColor: backgroundColor,
    },
    tabContainer: {
      flexDirection: "row",
      paddingHorizontal: 16,
      paddingBottom: 12,
      paddingTop: 8,
    },
    tab: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      height: 32, // h-8 equivalent
    },
    bottomSpacer: {
      height: 20, // h-5 equivalent
      backgroundColor: backgroundColor,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Main Content */}
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={require("@/assets/images/logo.png")}
            style={styles.logo}
            alt="App logo"
          />
        </View>

        <Text style={styles.mainTitle}>
          Celebrate your athletic achievements
        </Text>

        <View style={styles.loaderContainer}>
          <ActivityIndicator size="small" color={tintColor} />
          <Text style={styles.loaderText}>Loading...</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
