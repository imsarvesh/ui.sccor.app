import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";

interface SettingsItemProps {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  showArrow?: boolean;
  showSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
}

function SettingsItem({
  title,
  subtitle,
  onPress,
  showArrow = false,
  showSwitch = false,
  switchValue = false,
  onSwitchChange,
}: SettingsItemProps) {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const iconColor = useThemeColor({}, "icon");
  const secondaryTextColor = useThemeColor({}, "secondaryText");
  const borderColor = useThemeColor({}, "border");
  const backgroundSecondary = useThemeColor({}, "backgroundSecondary");
  const tintColor = useThemeColor({}, "tint");

  return (
    <TouchableOpacity
      style={[styles.settingsItem, { backgroundColor }]}
      onPress={onPress}
      disabled={!onPress && !showSwitch}
    >
      <View style={styles.settingsItemContent}>
        <View style={styles.settingsItemText}>
          <ThemedText style={[styles.settingsItemTitle, { color: textColor }]}>
            {title}
          </ThemedText>
          {subtitle && (
            <ThemedText
              style={[
                styles.settingsItemSubtitle,
                { color: secondaryTextColor },
              ]}
            >
              {subtitle}
            </ThemedText>
          )}
        </View>
        {showSwitch && (
          <Switch
            value={switchValue}
            onValueChange={onSwitchChange}
            trackColor={{
              false: backgroundSecondary,
              true: tintColor,
            }}
            thumbColor={backgroundColor}
            style={styles.switch}
          />
        )}
        {showArrow && (
          <Ionicons
            name="chevron-forward"
            size={20}
            color={iconColor}
            style={styles.arrow}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}

export default function SettingsScreen() {
  const router = useRouter();
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const iconColor = useThemeColor({}, "icon");
  const tintColor = useThemeColor({}, "tint");

  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);

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

  const handleEditProfile = () => {
    // Navigate to edit profile screen
    console.log("Navigate to edit profile");
    router.push("/profile/edit");
  };

  const handleChangePassword = () => {
    // Navigate to change password screen
    console.log("Navigate to change password");
  };

  const handleManageAccount = () => {
    // Navigate to manage account screen
    console.log("Navigate to manage account");
  };

  const handleProfileVisibility = () => {
    // Navigate to profile visibility settings
    console.log("Navigate to profile visibility");
  };

  const handleDataSharing = () => {
    // Navigate to data sharing settings
    console.log("Navigate to data sharing");
  };

  const handleFAQs = () => {
    // Navigate to FAQs screen
    router.push("/faq");
  };

  const handleContactSupport = () => {
    // Navigate to contact support screen
    console.log("Navigate to contact support");
  };

  const handleTroubleshooting = () => {
    // Navigate to troubleshooting screen
    console.log("Navigate to troubleshooting");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={[styles.container, { backgroundColor }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={textColor} />
          </TouchableOpacity>
          <ThemedText style={[styles.headerTitle, { color: textColor }]}>
            Settings
          </ThemedText>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Account Section */}
          <ThemedText style={[styles.sectionTitle, { color: textColor }]}>
            Account
          </ThemedText>

          <SettingsItem
            title="Edit Profile"
            onPress={handleEditProfile}
            showArrow={true}
          />

          <SettingsItem
            title="Change Password"
            onPress={handleChangePassword}
            showArrow={true}
          />

          <SettingsItem
            title="Manage Account"
            onPress={handleManageAccount}
            showArrow={true}
          />

          {/* Notifications Section */}
          <ThemedText style={[styles.sectionTitle, { color: textColor }]}>
            Notifications
          </ThemedText>

          <SettingsItem
            title="Push Notifications"
            subtitle="Receive push notifications for new followers, likes, comments, and more."
            showSwitch={true}
            switchValue={pushNotifications}
            onSwitchChange={setPushNotifications}
          />

          <SettingsItem
            title="Email Notifications"
            subtitle="Get email updates about your account activity and important announcements."
            showSwitch={true}
            switchValue={emailNotifications}
            onSwitchChange={setEmailNotifications}
          />

          {/* Privacy Section */}
          <ThemedText style={[styles.sectionTitle, { color: textColor }]}>
            Privacy
          </ThemedText>

          <SettingsItem
            title="Profile Visibility"
            subtitle="Control who can view your profile and activity."
            onPress={handleProfileVisibility}
            showArrow={true}
          />

          <SettingsItem
            title="Data Sharing"
            subtitle="Manage how your data is shared with third-party apps and services."
            onPress={handleDataSharing}
            showArrow={true}
          />

          {/* Help and Support Section */}
          <ThemedText style={[styles.sectionTitle, { color: textColor }]}>
            Help and Support
          </ThemedText>

          <SettingsItem title="FAQs" onPress={handleFAQs} showArrow={true} />

          <SettingsItem
            title="Contact Support"
            onPress={handleContactSupport}
            showArrow={true}
          />

          <SettingsItem
            title="Troubleshooting"
            onPress={handleTroubleshooting}
            showArrow={true}
          />
        </ScrollView>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity
            style={[styles.logoutButton, { backgroundColor: tintColor }]}
            onPress={handleLogout}
          >
            <ThemedText style={[styles.logoutButtonText, { color: "#ffffff" }]}>
              Log Out
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 8,
  },
  backButton: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginRight: 48, // Compensate for back button width
  },
  headerSpacer: {
    width: 48,
  },
  scrollView: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  settingsItem: {
    minHeight: 56,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  settingsItemContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  settingsItemText: {
    flex: 1,
    paddingVertical: 8,
  },
  settingsItemTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 2,
  },
  settingsItemSubtitle: {
    fontSize: 14,
    lineHeight: 18,
  },
  switch: {
    marginLeft: 8,
  },
  arrow: {
    marginLeft: 8,
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
});
