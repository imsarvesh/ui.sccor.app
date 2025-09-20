import { OtherProfile } from "@/graphql/types/graphql";
import useProfile from "@/hooks/useProfile";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useStore } from "@/providers/StoreProvider/useStore";
import { dateFormat } from "@/service/utils/dateFormat";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "../../components/ui";

export default function ProfileScreen() {
  const { username }: { username: string } = useLocalSearchParams();

  console.log(username);
  const { isLoading, profile: otherProfile } = useProfile(username);
  const { me } = useStore();
  const isSelf = me?.username === otherProfile?.username;
  const profile = isSelf ? me : otherProfile;

  // Theme colors must be called before any early returns
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const secondaryTextColor = useThemeColor({}, "secondaryText");
  const borderColor = useThemeColor({}, "border");

  if (isLoading) return <ActivityIndicator />;
  if (!profile) return <Redirect href="/+not-found" />;

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor }}>
      <ScrollView>
        {/* Header */}
        <View className="flex-row items-center justify-between p-4 pb-2">
          <TouchableOpacity
            className="w-12 h-12 items-center justify-center"
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={textColor} />
          </TouchableOpacity>
          <Text
            className="flex-1 text-center text-lg font-bold"
            style={{ color: textColor }}
          >
            {profile.name}
          </Text>
          <TouchableOpacity
            className="w-12 h-12 items-center justify-center"
            onPress={() => router.push("/profile/settings")}
          >
            <Ionicons name="settings-outline" size={24} color={textColor} />
          </TouchableOpacity>
        </View>

        {/* Profile Section */}
        <View className="p-4 items-center">
          <Image
            source={{
              uri: profile.image,
            }}
            className="w-32 h-32 rounded-full mb-4"
            alt={`${profile.name} profile picture`}
          />
          <Text
            className="text-[22px] font-bold text-center mb-1"
            style={{ color: textColor }}
          >
            {profile.name}
          </Text>
          <Text
            className="text-base text-center mb-0.5"
            style={{ color: secondaryTextColor }}
          >
            @{profile.username}
          </Text>
          <Text
            className="text-base text-center mb-4"
            style={{ color: secondaryTextColor }}
          >
            Joined on {dateFormat(new Date(+profile.createdAt))}
          </Text>
          {isSelf ? (
            <MyProfileActions profile={profile} />
          ) : (
            <OtherProfileActions profile={profile} />
          )}
        </View>

        {/* Stats */}
        <View className="flex-row flex-wrap gap-3 px-4 py-3">
          <View
            className="flex-1 min-w-[111px] rounded-lg p-3 items-center"
            style={{ borderColor, borderWidth: 1 }}
          >
            <Text
              className="text-2xl font-bold mb-2"
              style={{ color: textColor }}
            >
              {profile.postsCount}
            </Text>
            <Text className="text-sm" style={{ color: secondaryTextColor }}>
              Workouts
            </Text>
          </View>
          <View
            className="flex-1 min-w-[111px] rounded-lg p-3 items-center"
            style={{ borderColor, borderWidth: 1 }}
          >
            <Text
              className="text-2xl font-bold mb-2"
              style={{ color: textColor }}
            >
              {profile.followersCount}
            </Text>
            <Text className="text-sm" style={{ color: secondaryTextColor }}>
              Followers
            </Text>
          </View>
          <View
            className="flex-1 min-w-[111px] rounded-lg p-3 items-center"
            style={{ borderColor, borderWidth: 1 }}
          >
            <Text
              className="text-2xl font-bold mb-2"
              style={{ color: textColor }}
            >
              {profile.followingCount}
            </Text>
            <Text className="text-sm" style={{ color: secondaryTextColor }}>
              Following
            </Text>
          </View>
        </View>

        {/* Featured */}
        <Text
          className="text-[22px] font-bold px-4 pb-3 pt-5"
          style={{ color: textColor }}
        >
          Featured
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="py-4 px-4"
        >
          <View className="w-40 mr-3">
            <Image
              source={{
                uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIFMNWrVJD_SuCcwdEZPaYsX-1wpoJKMOH7MYAOF2mc6d2U62yeTZTDOi0xymrzYF2v2Sk4xrwOry0BGM68Pgloz4osvGqQjDHOHdCK-0nRnHNvHyjNqVsA58VoHLrMJ6SygE8oPAy7a9t-8RuI0IPcIGi7IIT0CiXe2gzTaErsQEYlIJYYFayc5JZTsXu2gtcyMnZ2-L2yeByjE_k0bPgJtI3-gFyoinh2cGNx-IfRpFoqirNhLICRD6w0xkQXTv6CLO1WmQpUvY",
              }}
              className="w-full aspect-square rounded-xl mb-4"
              alt="Marathon Finisher achievement"
            />
            <Text
              className="text-base font-medium mb-1"
              style={{ color: textColor }}
            >
              Marathon Finisher
            </Text>
            <Text className="text-sm" style={{ color: secondaryTextColor }}>
              Completed a full marathon
            </Text>
          </View>
          <View className="w-40 mr-3">
            <Image
              source={{
                uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAw0hLbeMGUOXm-5ahy83-FM-AEtAM4nBN-zvCMguzFFjvGloCt2c9gJParNSTGDI09dFsB2ZLgqEwhPPpBd4LfU76CXxJzWaRv6G9YF6cS60ZGUcDUgeUt1WOYkBON1ZPjnxdsJGIzLa7vHm944cTg8lNqa1CjJ8AqhbTXrslv8rHL3qmp8i-oJ52vXwb-uUeblkbWuFIoy8ND7__1QK71T0BpAjv2JmOFJApf1218RD48bATV-5lgh3sLJrq2dZxJOp-JSHXjtcQ",
              }}
              className="w-full aspect-square rounded-xl mb-4"
              alt="Strength Training achievement"
            />
            <Text
              className="text-base font-medium mb-1"
              style={{ color: textColor }}
            >
              Strength Training
            </Text>
            <Text className="text-sm" style={{ color: secondaryTextColor }}>
              Personal best in deadlift
            </Text>
          </View>
          <View className="w-40 mr-3">
            <Image
              source={{
                uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkp-nhacyDT9H3-snPfWPoncPnO6xJvpqtkangBqLneUWijqaGB7Ga9xPzZu4RmlzuM5RlguSZ-oK66WbhHTKfWyFHbHIUhSjEbdaf-TyoRM7jTwWoEpmcZ8DqCpX2SCF2MuIAO_7cruNhGTTiyy1i_TYQOpyUljLDdaWIRwkhLcaTtBd1xt4qAVIyavmhLj6mPdhbQ2cM1Nqk0gECMN8FITMJBx5gx5iISTWynGZf8A4YpGUh3PfwL5I7SHSFveINcvuECOYqo1I",
              }}
              className="w-full aspect-square rounded-xl mb-4"
              alt="Yoga Retreat achievement"
            />
            <Text
              className="text-base font-medium mb-1"
              style={{ color: textColor }}
            >
              Yoga Retreat
            </Text>
            <Text className="text-sm" style={{ color: secondaryTextColor }}>
              Attended a yoga retreat
            </Text>
          </View>
        </ScrollView>

        {/* Stats Grid */}
        <Text
          className="text-[22px] font-bold px-4 pb-3 pt-5"
          style={{ color: textColor }}
        >
          Stats
        </Text>
        <View className="flex-row flex-wrap gap-4 p-4">
          <View
            className="flex-1 min-w-[158px] rounded-xl p-6"
            style={{ borderColor, borderWidth: 1 }}
          >
            <Text
              className="text-base font-medium mb-2"
              style={{ color: textColor }}
            >
              Total Workouts
            </Text>
            <Text className="text-2xl font-bold" style={{ color: textColor }}>
              150
            </Text>
          </View>
          <View
            className="flex-1 min-w-[158px] rounded-xl p-6"
            style={{ borderColor, borderWidth: 1 }}
          >
            <Text
              className="text-base font-medium mb-2"
              style={{ color: textColor }}
            >
              Total Hours
            </Text>
            <Text className="text-2xl font-bold" style={{ color: textColor }}>
              200
            </Text>
          </View>
          <View
            className="flex-1 min-w-[158px] rounded-xl p-6"
            style={{ borderColor, borderWidth: 1 }}
          >
            <Text
              className="text-base font-medium mb-2"
              style={{ color: textColor }}
            >
              Average Intensity
            </Text>
            <Text className="text-2xl font-bold" style={{ color: textColor }}>
              8/10
            </Text>
          </View>
        </View>

        {/* Recent Activity */}
        <Text
          className="text-[22px] font-bold px-4 pb-3 pt-5"
          style={{ color: textColor }}
        >
          Recent Activity
        </Text>
        <View className="px-4">
          <View className="flex-row mb-4">
            <View className="w-10 items-center mr-2">
              <MaterialCommunityIcons name="run" size={24} color={textColor} />
              <View
                className="w-[1.5px] my-1 flex-1"
                style={{ backgroundColor: borderColor }}
              />
            </View>
            <View className="flex-1 py-3">
              <Text
                className="text-base font-medium mb-1"
                style={{ color: textColor }}
              >
                Completed 10k Run
              </Text>
              <Text className="text-base" style={{ color: secondaryTextColor }}>
                Today
              </Text>
            </View>
          </View>

          <View className="flex-row mb-4">
            <View className="w-10 items-center mr-2">
              <View
                className="w-[1.5px] mb-1"
                style={{ backgroundColor: borderColor }}
              />
              <MaterialCommunityIcons
                name="dumbbell"
                size={24}
                color={textColor}
              />
              <View
                className="w-[1.5px] mt-1 flex-1"
                style={{ backgroundColor: borderColor }}
              />
            </View>
            <View className="flex-1 py-3">
              <Text
                className="text-base font-medium mb-1"
                style={{ color: textColor }}
              >
                Strength Training Session
              </Text>
              <Text className="text-base" style={{ color: secondaryTextColor }}>
                Yesterday
              </Text>
            </View>
          </View>

          <View className="flex-row mb-4">
            <View className="w-10 items-center mr-2">
              <View
                className="w-[1.5px] mb-1"
                style={{ backgroundColor: borderColor }}
              />
              <MaterialCommunityIcons name="yoga" size={24} color={textColor} />
            </View>
            <View className="flex-1 py-3">
              <Text
                className="text-base font-medium mb-1"
                style={{ color: textColor }}
              >
                Yoga Class
              </Text>
              <Text className="text-base" style={{ color: secondaryTextColor }}>
                2 days ago
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const MyProfileActions = ({ profile }: { profile: OtherProfile }) => {
  const backgroundSecondary = useThemeColor({}, "backgroundSecondary");
  const textColor = useThemeColor({}, "text");

  return (
    <View className="flex-row gap-3 w-full max-w-[480px]">
      <TouchableOpacity
        className="flex-1 h-10 rounded-full items-center justify-center px-4"
        style={{ backgroundColor: backgroundSecondary }}
        onPress={() => router.push("/profile/edit")}
      >
        <Text className="text-sm font-bold" style={{ color: textColor }}>
          Edit Profile
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-1 h-10 rounded-full items-center justify-center px-4"
        style={{ backgroundColor: "#0d80f2" }}
      >
        <Text className="text-sm font-bold text-white">Share</Text>
      </TouchableOpacity>
    </View>
  );
};

const OtherProfileActions = ({ profile }: { profile: OtherProfile }) => {
  const backgroundSecondary = useThemeColor({}, "backgroundSecondary");
  const textColor = useThemeColor({}, "text");

  return (
    <View className="flex-row gap-3 w-full max-w-[480px]">
      <TouchableOpacity
        className="flex-1 h-10 rounded-full items-center justify-center px-4"
        style={{ backgroundColor: backgroundSecondary }}
        onPress={() => console.log("follow", profile.username)}
      >
        <Text className="text-sm font-bold" style={{ color: textColor }}>
          Follow
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-1 h-10 rounded-full items-center justify-center px-4"
        style={{ backgroundColor: "#0d80f2" }}
        onPress={() => console.log("message", profile.username)}
      >
        <Text className="text-sm font-bold text-white">Message</Text>
      </TouchableOpacity>
    </View>
  );
};
