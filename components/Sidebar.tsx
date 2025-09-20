import { Box, Pressable, Text, VStack } from "@/components/ui";
import config from "@/constants/configs";
import { useStore } from "@/providers";
import useAuth from "@/service/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Animated, Dimensions, Image, StyleSheet } from "react-native";
import { Fonts } from "../constants/Fonts";
import { useThemeColor } from "../hooks/useThemeColor";

interface SidebarProps {
  visible: boolean;
  onClose: () => void;
  onPrivacyPress?: () => void;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const sidebarWidth = screenWidth * 0.8;

const Sidebar: React.FC<SidebarProps> = ({ visible, onClose }) => {
  const { me, isLoggedIn } = useStore();

  const { logout } = useAuth({});
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const iconColor = useThemeColor({}, "icon");
  const borderColor = useThemeColor({}, "border");
  const profileImage = me?.image ? { uri: me?.image } : config.defaultAvatar;
  const tintColor = useThemeColor({}, "tint");
  const slideAnim = React.useRef(new Animated.Value(-sidebarWidth)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -sidebarWidth,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  const styles = StyleSheet.create({
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
    sidebar: {
      position: "absolute",
      top: 0,
      left: 0,
      width: sidebarWidth,
      height: screenHeight,
      backgroundColor: backgroundColor,
      borderRightWidth: 1,
      borderRightColor: borderColor,
      zIndex: 1002,
    },
    header: {
      paddingTop: 100,
      paddingHorizontal: 20,
      paddingBottom: 20,
      borderBottomWidth: 1,
      borderBottomColor: borderColor,
    },
    userInfo: {
      alignItems: "center",
      marginBottom: 20,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginBottom: 10,
    },
    userName: {
      fontSize: 18,
      fontFamily: Fonts.lexend.bold,
      color: textColor,
      marginBottom: 4,
    },
    userEmail: {
      fontSize: 14,
      fontFamily: Fonts.lexend.regular,
      color: textColor,
      opacity: 0.7,
    },
    menuItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: borderColor,
    },
    menuItemText: {
      fontSize: 16,
      fontFamily: Fonts.lexend.regular,
      color: textColor,
      marginLeft: 16,
    },
    closeButton: {
      position: "absolute",
      top: 60,
      right: 20,
      zIndex: 1002,
    },
    loginButton: {
      height: 40,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 16,
      backgroundColor: tintColor,
      color: "white",
      width: "100%",
    },
    loginButtonText: {
      fontSize: 14,
      fontFamily: Fonts.lexend.regular,
      color: "white",
    },
  });

  const commonMenuItems = [
    { icon: "help-circle-outline", title: "Help & Support", onPress: () => {} },
    {
      icon: "shield-outline",
      title: "Privacy",
      onPress: () => {
        onClose();
        router.push("/privacy");
      },
    },

    { icon: "information-circle-outline", title: "About", onPress: () => {} },
  ];

  const loggedInMenuItems = [
    {
      icon: "settings-outline",
      title: "Settings",
      onPress: () => {
        onClose();
        router.push("/profile/settings");
      },
    },

    {
      icon: "person-outline",
      title: "Profile",
      onPress: () => {
        logout().then(() => {
          onClose();
          router.push(`/profile/${me?.username}`);
        });
      },
    },
    {
      icon: "log-out-outline",
      title: "Sign Out",
      onPress: () => {
        logout().then(() => {
          onClose();
          router.push("/");
        });
      },
    },
  ];

  const loggedOutMenuItems = [
    {
      icon: "person-add-outline",
      title: "Login",
      onPress: () => {
        onClose();
        router.push("/login");
      },
    },
  ];

  const menuItems = [
    ...commonMenuItems,
    ...(isLoggedIn ? loggedInMenuItems : loggedOutMenuItems),
  ];

  if (!visible) return null;

  return (
    <>
      <Pressable style={styles.overlay} onPress={onClose} />
      <Animated.View
        style={[
          styles.sidebar,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        <Pressable style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={24} color={iconColor} />
        </Pressable>

        <Pressable
          style={styles.header}
          onPress={() => {
            onClose();
            if (!isLoggedIn) router.push("/login");
            else router.push(`/profile/${me?.username}`);
          }}
        >
          <VStack style={styles.userInfo}>
            <Box
              style={styles.avatar}
              className="justify-center"
              alignItems="center"
            >
              <Image
                source={profileImage}
                style={styles.avatar}
                alt="Profile picture"
              />
              {!isLoggedIn && (
                <Pressable
                  style={styles.loginButton}
                  onPress={() => {
                    onClose();
                    router.push("/login");
                  }}
                >
                  <Text style={styles.loginButtonText}>Login</Text>
                </Pressable>
              )}
            </Box>
            {isLoggedIn && (
              <>
                <Text style={styles.userName}>{me?.name}</Text>
                <Text style={styles.userEmail}>{me?.email}</Text>
              </>
            )}
          </VStack>
        </Pressable>

        <VStack style={{ flex: 1 }}>
          {menuItems.map((item, index) => (
            <Pressable
              key={index}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <Ionicons name={item.icon as any} size={24} color={iconColor} />
              <Text style={styles.menuItemText}>{item.title}</Text>
            </Pressable>
          ))}
        </VStack>
      </Animated.View>
    </>
  );
};

export default Sidebar;
