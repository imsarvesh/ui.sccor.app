import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

interface User {
  id: string;
  name: string;
  avatar: string;
}

interface SuggestedUsersProps {
  users: User[];
}

const SuggestedUsers: React.FC<SuggestedUsersProps> = ({ users }) => {
  const primary = useThemeColor({}, "primaryText");
  const surface = useThemeColor({}, "backgroundSecondary");
  const tertiary = useThemeColor({}, "backgroundSecondary");

  return (
    <View className="px-4 py-2">
      <Text className="text-[22px] font-bold mb-3" style={{ color: primary }}>
        Who to follow
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-row"
      >
        {users.map((user) => (
          <View
            key={user.id}
            className="w-40 rounded-xl p-4 mr-3 items-center shadow-sm"
            style={{ backgroundColor: surface }}
          >
            <Image
              source={{ uri: user.avatar }}
              className="w-20 h-20 rounded-full mb-3"
            />
            <Text
              className="text-base font-medium mb-3 text-center"
              style={{ color: primary }}
            >
              {user.name}
            </Text>
            <TouchableOpacity
              className="px-4 py-2 rounded-full"
              style={{ backgroundColor: Colors.light.tint }}
            >
              <Text
                className="text-sm font-semibold"
                style={{ color: "white" }}
              >
                Follow
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default SuggestedUsers;
