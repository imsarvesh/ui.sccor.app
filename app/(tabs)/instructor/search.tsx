import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Text as ThemedText } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, View } from "react-native";
import { SafeAreaView } from "@/components/ui";

interface Instructor {
  id: string;
  name: string;
  specialization: string;
  avatar: string;
}

const mockInstructors: Instructor[] = [
  {
    id: "1",
    name: "Alex Turner",
    specialization: "Strength Training",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCt_G7DaycC83Voy8fxnzSQScrAj3j5pJ2ENxB7fqwVzVUyVnX6x_WVmqKkK6loKRn0un87SrjuAeaFH698nHiV_Y7mGBm1ZpVa-JIR3SPWcYSJpZ5MRhpqVmAAH-BXNGseoG-AXU2E3GlyMxv0YzBYGkiV29SfjMIHdBP4Zo09omGDsT8jwrx6C27UAXZqC9YCf18WQAQU1zeKQ2PAw6P4QuwUaFyX9H9hBhRlQFfw2if2hJgVpbB9u0M2L_UVd_XiuWyxpuPoXRI",
  },
  {
    id: "2",
    name: "Sophia Clark",
    specialization: "Yoga",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAkEHaFkbYYZWI7_FpY_oWou4f5cgdLVe7k-4ngDKZlKMCsLbW2BeAy_sDXeoqxzSisABd4BH-QOdz0Oi3a4EhIewr-WXGDYQ6j6dbipP4v78mN5C9D-gzqRI1_IQoamQGE1IUZ12Rdf59DSNH8sUQEyx2yRDYvEus58r70nfWva9TdX095XjX7uLzTM8HfhZuH6Pq8Q5pXUaXGKstauueK9qHa63cLJAPd6plXdFH7izNuOeHonK5g8AvT7lVmQR5CnaNIQNYIGC8",
  },
  {
    id: "3",
    name: "Ethan Bennett",
    specialization: "Personal Training",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAwtaUcP8lA2ylwyHpgnkP8nfLCrn2BSC--F51RRSB7m3bpn70B37MFPmCWr_KVJSWB0jW8KEY4IIsRZyTKSCDx4nB085WU9EboPHFlIIh4zy5J_MVkqdw69cDIZ5qXnWQT_E5jEdsHAU-CGT71qdYrizq-NGhFhM3zvLoIUMfoZklTzbtj3LjuCmb6ASIrNAAXhLWs9OTGEE9ZDel08x8DfNy_4tLLL2Fnbfnwjsj79laH-_dtJPjATNyavUPzcdl00sEaD0gSWY8",
  },
  {
    id: "4",
    name: "Olivia Carter",
    specialization: "Crossfit",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDoP7pbwlCaPannAdZ_a2EF0e8PFrtzoI_eWMWeruC2rnO2gIaaaMoSOaP7qROXVS6WkmhT5rr_d1AbePv2Aow5iuDxxTsXYb5m3KqBK8oI_AGo0cI4rX2zxNkRSgTVsg4zEmU9sVq1IRAjYHGLaAi-4WNoARbyG5hrjEzibwgS-gZpvK3fArrcT8aCa-dS2XapN2jT9ImvgC4ePw_MYjlppA1M_owowkkCk8QdsQupthRIa4p4_zUSDjjY998RqJZm4RrIz6nNNyY",
  },
];

const activityFilters = ["Weightlifting", "Yoga", "Personal Training"];
const dropdownFilters = ["Location", "Specialization", "Client Testimonials"];

export default function SearchInstructorScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const router = useRouter();
  const tintColor = colors.tint;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  const handleInstructorPress = (instructorId: string) => {
    router.push(`/instructor/${instructorId}`);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.backgroundPrimary,
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        {/* Header */}
        <Header title="Search Instructors" isBack={true} />

        {/* Search Bar */}
        <SearchInput
          placeholder="Search instructors"
          autoFocus={true}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* Activity Filters */}
        <HStack className="px-3 pb-3 gap-2 flex-row flex-wrap">
          {activityFilters.map((activity) => (
            <Pressable
              key={activity}
              className="px-4 py-2 rounded-full min-h-8 justify-center"
              style={{
                backgroundColor:
                  selectedActivity === activity
                    ? tintColor
                    : colors.backgroundSecondary,
              }}
              onPress={() =>
                setSelectedActivity(
                  selectedActivity === activity ? null : activity
                )
              }
            >
              <ThemedText
                className="text-sm font-medium"
                style={{
                  color:
                    selectedActivity === activity
                      ? "#FFFFFF"
                      : colors.primaryText,
                }}
              >
                {activity}
              </ThemedText>
            </Pressable>
          ))}
        </HStack>

        {/* Dropdown Filters */}
        <HStack className="px-3 pb-3 gap-2 flex-row flex-wrap">
          {dropdownFilters.map((filter) => (
            <Pressable
              key={filter}
              className="flex-row items-center px-4 py-2 rounded-full min-h-8"
              style={{ backgroundColor: colors.backgroundSecondary }}
            >
              <ThemedText style={{ color: colors.primaryText }}>
                {filter}
              </ThemedText>
              <Ionicons
                name="chevron-down"
                size={20}
                color={colors.secondaryText}
                className="ml-2"
              />
            </Pressable>
          ))}
        </HStack>

        {/* Instructor List */}
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {mockInstructors.map((instructor) => (
            <Pressable
              key={instructor.id}
              className="py-2"
              onPress={() => handleInstructorPress(instructor.id)}
            >
              <HStack className="items-center px-4">
                <Image
                  source={{ uri: instructor.avatar }}
                  className="w-14 h-14 rounded-full mr-4"
                  alt={`${instructor.name} profile picture`}
                />
                <VStack className="flex-1 justify-center mr-4">
                  <ThemedText
                    className="text-base font-medium mb-0.5"
                    style={{ color: colors.primaryText }}
                  >
                    {instructor.name}
                  </ThemedText>
                  <ThemedText
                    className="text-sm font-normal"
                    style={{ color: colors.secondaryText }}
                  >
                    {instructor.specialization}
                  </ThemedText>
                </VStack>
                <Ionicons
                  name="chevron-forward-outline"
                  size={24}
                  color={colors.secondaryText}
                />
              </HStack>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
