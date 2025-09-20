import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";

const Header = ({
  title,
  isBack = false,
  isSearch = true,
  onSearchPress = () => router.push("/search"),
  onBackPress = () => router.back(),
}: {
  title: string;
  isBack?: boolean;
  isSearch?: boolean;
  onSearchPress?: () => void;
  onBackPress?: () => void;
}) => {
  const iconColor = useThemeColor({}, "icon");
  return (
    <View className="flex-row items-center p-4 pb-2 justify-between">
      <TouchableOpacity
        className={`w-12 items-center ${isBack ? "opacity-100" : "opacity-0"}`}
        onPress={() => isBack && onBackPress()}
      >
        <Ionicons name="chevron-back" size={24} color={iconColor} />
      </TouchableOpacity>
      <ThemedText className="text-lg font-bold leading-tight flex-1 text-center">
        {title}
      </ThemedText>

      <TouchableOpacity
        className={`w-12 items-center ${
          isSearch ? "opacity-100" : "opacity-0"
        }`}
        onPress={() => isSearch && onSearchPress()}
      >
        <Ionicons name="search-outline" size={24} color={iconColor} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
