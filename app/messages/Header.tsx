import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";

const Header = ({
  title,
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
        className={`w-12 items-center opacity-100`}
        onPress={() => onBackPress()}
      >
        <Ionicons name="chevron-back" size={24} color={iconColor} />
      </TouchableOpacity>
      <ThemedText className="text-lg font-bold leading-tight flex-1 text-center line-clamp-1">
        {title}
      </ThemedText>

      <TouchableOpacity
        className={`w-12 items-center opacity-100`}
        onPress={() => router.push("/messages/search")}
      >
        <Ionicons name="add" size={24} color={iconColor} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
