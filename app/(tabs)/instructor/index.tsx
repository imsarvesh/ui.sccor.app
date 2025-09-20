import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import { ThemedText } from "@/components/ThemedText";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useRouter } from "expo-router";
import React from "react";

import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Instructor {
  id: string;
  name: string;
  specialty: string;
  imageUrl: string;
}

const featuredInstructors: Instructor[] = [
  {
    id: "1",
    name: "Sarah",
    specialty: "Yoga",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBQkNcb4CtwFjM4hTjh0FKvRZxJF_4QgGKM2TroXsOn5WqY_RR1-y_BFJc8MRrLstB8UPadrybPIfbC9sCtJsGcHeDfJ8sctBDQeiS1RU3kKbKI34UYh-C4qq_qGUVCxMz4xDOkqYmt6Kt9PWI7S9F-Tq9tbiooPB2jpmuFYwAbcPzIcdw4jJsakBCzcUQB2uVlyDcvJ052Qn9UZybM6YzlXg0bpWoKIs3jtzzESeBPKb0HUMpQVwB0C3enrPd-5jWz_NK3MDnap0w",
  },
  {
    id: "2",
    name: "Mark",
    specialty: "Strength",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD6fPc0KL0Ohe6fdK8qQj1M80JQu1rYsRnfu8vHZVULhw6dBqvFvTTZS-yWKmF40FIcHgWkbQopssxH8OHP2B_OR5qaSKB7retsKiFv1yAlFVVoAeEvwRTdCm63fnZTccuEOx2sBNZORyS7v4yHS8yl5k8Z61lAKa2s01jpyN27ZKm0pjL8UUK3toCZ2EuTMTSs1vmNVWMCZhuZbEzr8vzotWDfgMOFTCJcc9rSeRYPri8Dne6oTgleVQsiHaFIFuW-EC-fMewcFI8",
  },
  {
    id: "3",
    name: "Emily",
    specialty: "Pilates",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAsQr9UHYClR0NTEa-XSjD2GqMBAVqcogZ0d2F8Iq9i0kWdIjGqb110LFLCXNO83v0i2YuQaQsUCdV95Cgbs3yg_FK-Ik8IE_0CJtHDmdWl2mBXVosAYhOvBhnQV49UBd5jpyf9eDOJFn3inSnQRPvfrrZ-p6a_81InW6BiuMxUMrzdNnO6OAQYFR5kcVwniARStJN27Z_0IWTftB9hAjL4Jk6jWrFwCvSQUC39icAYcmzqAoZTk8qHuhqRYhkduVRLWqOn9Pv21DU",
  },
];

const nearbyInstructors: Instructor[] = [
  {
    id: "1",
    name: "Sarah",
    specialty: "Yoga",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDq936o-4UVMtGftwkTo-506YYXP7L60BWA5CylGU_NV7-Was_UA9CY0DFmXFAGjxL3Sbua6DsCeQckE1ahxLDYp2wC2mDO8gNwpJxq0HXCddW_roIBemW1Kz4LXOJHqmPiILURrQu1fUQSfV4NLpUbje_PacRl4y0BkVSDiVbceXMdCBMwzUoTUV24sNZ36YvM0TW_THEMPvs8W2HzFRLTdZlH5rpQS8ogzOKKcBQRRBv-EJ2MByy0O8W5sKSt1rIFPi78dZyZl-Q",
  },
  {
    id: "2",
    name: "Mark",
    specialty: "Strength",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA-XcrIr1Z9wCIKVY5l9zxG8rCwj4OMv6hk6iJMCQ9M_51uO9Kye4j4yJ9L8EngGzyjona0ZW4qpUDOXQL6mP65l7LsXVAuqAUGJtEn4ZI2tOKFJ58ChZVo6UiLY_G8D8-Zt9H7OExyWWGNjUr2RyeSuTmS0mcJewShLixifhPx-ZdonCVElMXsVTq9YfSZyqJn9EqAbp5qOdFZTjIN6G-29ANyGarEz4hkGWBCAaBTqLdGmefVuFLbD_-znd7cah2Wr0jssMEcnR0",
  },
  {
    id: "3",
    name: "Emily",
    specialty: "Pilates",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAIcJrujBjQCZVGc06ouOAZeXS7-Qr7EE2qOZvGMWbHyUARpB1vyZgAOWUP3j02Dp_SN4KTcnbepLqMBqXW6sKYqoP5Y68-q9d-6YJnmsLEHIkQWJDhqvcMPhmD6a8eRcD662g7NUhRBlw7aETVKuFfupjO68vi0sPcehwoCA3f9_KEtj1-szE84OZacJsYr-TrgkW4m6kU9m74CyLLYVTUUeIr0ZbMu1zO0k8TlMH1NMEsZL_OMoH-TtfmxWaj-_cNbgILQsefiJw",
  },
];

export default function InstructorScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const router = useRouter();

  const handleInstructorPress = (instructor: Instructor) => {
    router.push(`/instructor/${instructor.id}`);
  };

  const renderFeaturedInstructor = (instructor: Instructor) => (
    <TouchableOpacity
      key={instructor.id}
      className="w-40 mr-3"
      onPress={() => handleInstructorPress(instructor)}
    >
      <Image
        source={{ uri: instructor.imageUrl }}
        className="w-full aspect-square rounded-xl mb-4"
      />
      <ThemedText
        style={{ color: colors.primaryText }}
        className="text-base font-medium leading-5"
      >
        {instructor.name}, {instructor.specialty}
      </ThemedText>
    </TouchableOpacity>
  );

  const renderNearbyInstructor = (instructor: Instructor) => (
    <TouchableOpacity
      key={instructor.id}
      className="flex-row items-center px-4 py-2 min-h-[72px]"
      onPress={() => handleInstructorPress(instructor)}
    >
      <Image
        source={{ uri: instructor.imageUrl }}
        className="w-14 h-14 rounded-full mr-4"
      />
      <View className="flex-1">
        <ThemedText
          style={{ color: colors.primaryText }}
          className="text-base font-medium leading-5"
        >
          {instructor.name}
        </ThemedText>
        <ThemedText
          style={{ color: colors.secondaryText }}
          className="text-sm font-normal leading-[18px] mt-0.5"
        >
          {instructor.specialty}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={{ backgroundColor: colors.backgroundPrimary }}
      className="flex-1"
    >
      <Header title="Instructors" />

      <SearchInput
        onFocus={() => {
          router.push("/instructor/search");
        }}
        placeholder="Search Instructors"
      />

      <ScrollView className="flex-1">
        <ThemedText
          style={{ color: colors.primaryText }}
          className="text-lg font-bold leading-tight tracking-[-0.27px] px-4 pb-2 pt-4"
        >
          Featured
        </ThemedText>
        <View className="px-4">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="py-4"
          >
            {featuredInstructors.map(renderFeaturedInstructor)}
          </ScrollView>
        </View>

        <ThemedText
          style={{ color: colors.primaryText }}
          className="text-lg font-bold leading-tight tracking-[-0.27px] px-4 pb-2 pt-4"
        >
          Nearby
        </ThemedText>
        {nearbyInstructors.map(renderNearbyInstructor)}
      </ScrollView>

      <View
        style={{ backgroundColor: colors.backgroundPrimary }}
        className="h-5"
      />
    </SafeAreaView>
  );
}
