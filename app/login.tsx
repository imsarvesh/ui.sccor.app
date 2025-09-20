import { Header } from "@/components";
import { Box, Pressable, Text, VStack } from "@/components/ui";
import { Fonts } from "@/constants/Fonts";
import { useThemeColor } from "@/hooks/useThemeColor";
import GoogleSignIn from "@/lib/GoogleSignIn";
import useAuth from "@/service/hooks/useAuth";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen() {
  const { logout, session } = useAuth({});
  const router = useRouter();
  const backgroundColor = useThemeColor({}, "background");
  const tintColor = useThemeColor({}, "tint");

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Log Out",
        style: "destructive",
        onPress: () => {
          // Handle logout logic here
          console.log("User logged out");
        },
      },
    ]);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: backgroundColor,
    },
    logoutContainer: {
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    logoutButton: {
      height: 40,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 16,
    },
    logoutButtonText: {
      fontSize: 14,
      fontWeight: "bold",
    },
    footer: {
      paddingBottom: 20,
    },
    footerText: {
      color: "#49739c",
      fontSize: 14,
      fontFamily: Fonts.notoSans.regular,
      textAlign: "center",
      paddingBottom: 12,
      paddingTop: 4,
      paddingHorizontal: 16,
    },
    privacyLink: {
      textDecorationLine: "underline",
    },
    bottomSpacer: {
      height: 20,
      backgroundColor: backgroundColor,
    },
  });
  return (
    <SafeAreaView style={styles.container} className="flex-1 bg-background">
      <Box className="flex-1 bg-background">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <VStack className="flex-1">
            {/* Header */}
            <Header title="Login" isBack={true} isSearch={false} />

            {/* Form */}
            <VStack className="flex-1 px-4 pt-2 justify-center">
              {session ? (
                <Box style={styles.logoutContainer}>
                  <Pressable
                    style={[
                      styles.logoutButton,
                      { backgroundColor: tintColor },
                    ]}
                    onPress={handleLogout}
                  >
                    <Text
                      style={[styles.logoutButtonText, { color: "#ffffff" }]}
                    >
                      Log Out
                    </Text>
                  </Pressable>
                </Box>
              ) : (
                <Box className="px-4 py-3 items-center justify-center">
                  <VStack>
                    <GoogleSignIn />
                  </VStack>
                </Box>
              )}
            </VStack>

            {/* Logout Button */}

            {/* Footer */}
            <Box style={styles.footer}>
              <Text style={styles.footerText}>
                By continuing, you agree to our Terms of Service and
              </Text>
              <Pressable onPress={() => router.push("/privacy")}>
                <Text style={[styles.footerText, styles.privacyLink]}>
                  Privacy Policy
                </Text>
              </Pressable>
              <Box style={styles.bottomSpacer} />
            </Box>
          </VStack>
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
}
