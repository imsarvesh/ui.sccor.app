import { Header, PostCreation } from "@/components";
import { ThemedText } from "@/components/ThemedText";
import { Box, HStack, Pressable, Text } from "@/components/ui";
import { Icon } from "@/components/ui/icon";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, TextInput, View } from "react-native";
import { SafeAreaView } from "@/components/ui";
import withLogin from "@/components/withLogin";

interface ActivityItemProps {
  icon: string;
  title: string;
  onPress: () => void;
}

interface ActivityFormData {
  duration: string;
  distance: string;
  calories: string;
  notes: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({
  icon,
  title,
  onPress,
}) => {
  const primaryText = useThemeColor({}, "primaryText");
  const backgroundSecondary = useThemeColor({}, "backgroundSecondary");
  const border = useThemeColor({}, "border");

  return (
    <Pressable
      onPress={onPress}
      style={{
        flex: 1,
        minHeight: 60,
        backgroundColor: backgroundSecondary,
        borderWidth: 1,
        borderColor: border,
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        marginHorizontal: 6,
      }}
    >
      <HStack style={{ alignItems: "center", gap: 12 }}>
        <Box style={{ width: 24, height: 24 }}>
          <Icon name={icon as any} size={24} color={primaryText} />
        </Box>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: primaryText,
            flex: 1,
          }}
        >
          {title}
        </Text>
      </HStack>
    </Pressable>
  );
};

const ActivityForm: React.FC<{
  activity: string;
  onBack: () => void;
  onSubmit: (data: ActivityFormData) => void;
}> = ({ activity, onBack, onSubmit }) => {
  const primaryText = useThemeColor({}, "primaryText");
  const backgroundPrimary = useThemeColor({}, "backgroundPrimary");
  const backgroundSecondary = useThemeColor({}, "backgroundSecondary");
  const border = useThemeColor({}, "border");
  const secondaryText = useThemeColor({}, "secondaryText");

  const [formData, setFormData] = useState<ActivityFormData>({
    duration: "",
    distance: "",
    calories: "",
    notes: "",
  });

  const handleSubmit = () => {
    if (!formData.duration.trim()) {
      Alert.alert("Error", "Please enter duration");
      return;
    }
    onSubmit(formData);
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: backgroundPrimary }}
      className="flex-1"
    >
      <View className="flex-1">
        {/* Header */}
        <Header
          title={`${activity} Details`}
          isBack={true}
          onBackPress={onBack}
          isSearch={false}
        />

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="p-4 gap-5">
            {/* Duration */}
            <View className="gap-2">
              <ThemedText className="text-base font-bold leading-normal">
                Duration (minutes)
              </ThemedText>
              <TextInput
                style={{
                  backgroundColor: backgroundSecondary,
                  borderWidth: 1,
                  borderColor: border,
                  borderRadius: 8,
                  padding: 12,
                  fontSize: 16,
                  color: primaryText,
                }}
                placeholder="Enter duration in minutes"
                placeholderTextColor={secondaryText}
                value={formData.duration}
                onChangeText={(text) =>
                  setFormData({ ...formData, duration: text })
                }
                keyboardType="numeric"
              />
            </View>

            {/* Distance */}
            <View className="gap-2">
              <ThemedText className="text-base font-bold leading-normal">
                Distance (km)
              </ThemedText>
              <TextInput
                style={{
                  backgroundColor: backgroundSecondary,
                  borderWidth: 1,
                  borderColor: border,
                  borderRadius: 8,
                  padding: 12,
                  fontSize: 16,
                  color: primaryText,
                }}
                placeholder="Enter distance in kilometers"
                placeholderTextColor={secondaryText}
                value={formData.distance}
                onChangeText={(text) =>
                  setFormData({ ...formData, distance: text })
                }
                keyboardType="numeric"
              />
            </View>

            {/* Calories */}
            <View className="gap-2">
              <ThemedText className="text-base font-bold leading-normal">
                Calories Burned
              </ThemedText>
              <TextInput
                style={{
                  backgroundColor: backgroundSecondary,
                  borderWidth: 1,
                  borderColor: border,
                  borderRadius: 8,
                  padding: 12,
                  fontSize: 16,
                  color: primaryText,
                }}
                placeholder="Enter calories burned"
                placeholderTextColor={secondaryText}
                value={formData.calories}
                onChangeText={(text) =>
                  setFormData({ ...formData, calories: text })
                }
                keyboardType="numeric"
              />
            </View>

            {/* Notes */}
            <View className="gap-2">
              <ThemedText className="text-base font-bold leading-normal">
                Notes (Optional)
              </ThemedText>
              <TextInput
                style={{
                  backgroundColor: backgroundSecondary,
                  borderWidth: 1,
                  borderColor: border,
                  borderRadius: 8,
                  padding: 12,
                  fontSize: 16,
                  color: primaryText,
                  height: 100,
                  textAlignVertical: "top",
                }}
                placeholder="Add any notes about your activity..."
                placeholderTextColor={secondaryText}
                value={formData.notes}
                onChangeText={(text) =>
                  setFormData({ ...formData, notes: text })
                }
                multiline
                numberOfLines={4}
              />
            </View>

            {/* Submit Button */}
            <Box
              style={{
                paddingVertical: 12,
                paddingHorizontal: 16,
                marginTop: 20,
              }}
            >
              <Pressable
                onPress={handleSubmit}
                style={{
                  backgroundColor: primaryText,
                  borderRadius: 20,
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    color: backgroundPrimary,
                  }}
                >
                  Continue to Post
                </Text>
              </Pressable>
            </Box>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

// Helper function to generate hashtags based on activity
const generateHashtags = (
  activity: string,
  data: ActivityFormData
): string[] => {
  const hashtags = [];

  // Activity-specific hashtags
  const activityHashtags: { [key: string]: string[] } = {
    Run: ["#running", "#run", "#fitness", "#cardio", "#workout"],
    Cycle: ["#cycling", "#bike", "#fitness", "#cardio", "#workout"],
    Swim: ["#swimming", "#swim", "#fitness", "#cardio", "#workout"],
    Yoga: ["#yoga", "#mindfulness", "#flexibility", "#wellness", "#meditation"],
    Soccer: ["#soccer", "#football", "#sports", "#teamwork", "#fitness"],
    Basketball: ["#basketball", "#sports", "#teamwork", "#fitness", "#cardio"],
    Baseball: ["#baseball", "#sports", "#teamwork", "#fitness"],
    Tennis: ["#tennis", "#sports", "#fitness", "#cardio", "#agility"],
    Volleyball: ["#volleyball", "#sports", "#teamwork", "#fitness"],
    Football: ["#football", "#sports", "#teamwork", "#fitness", "#cardio"],
    Hockey: ["#hockey", "#sports", "#teamwork", "#fitness"],
    Golf: ["#golf", "#sports", "#precision", "#outdoors"],
    Weightlifting: [
      "#weightlifting",
      "#strength",
      "#fitness",
      "#gym",
      "#muscle",
    ],
    "Strength Training": [
      "#strengthtraining",
      "#fitness",
      "#gym",
      "#muscle",
      "#power",
    ],
    Treadmill: ["#treadmill", "#running", "#cardio", "#fitness", "#workout"],
    Other: ["#fitness", "#workout", "#health", "#wellness"],
  };

  // Add activity-specific hashtags
  if (activityHashtags[activity]) {
    hashtags.push(...activityHashtags[activity]);
  }

  // Add duration-based hashtags
  if (data.duration) {
    const duration = parseInt(data.duration);
    if (duration >= 60) {
      hashtags.push("#longworkout", "#endurance");
    } else if (duration >= 30) {
      hashtags.push("#moderateworkout");
    } else {
      hashtags.push("#quickworkout", "#efficient");
    }
  }

  // Add distance-based hashtags
  if (data.distance) {
    const distance = parseFloat(data.distance);
    if (distance >= 10) {
      hashtags.push("#longdistance", "#endurance");
    } else if (distance >= 5) {
      hashtags.push("#moderatedistance");
    } else {
      hashtags.push("#shortdistance");
    }
  }

  // Add calories-based hashtags
  if (data.calories) {
    const calories = parseInt(data.calories);
    if (calories >= 500) {
      hashtags.push("#highcalorieburn", "#intenseworkout");
    } else if (calories >= 200) {
      hashtags.push("#moderateburn");
    } else {
      hashtags.push("#lightworkout");
    }
  }

  // Add general fitness hashtags
  hashtags.push("#fitness", "#healthylifestyle", "#motivation");

  // Remove duplicates and return
  return [...new Set(hashtags)];
};

// Helper function to format activity post content
const formatActivityPost = (
  activity: string,
  data: ActivityFormData
): string => {
  let post = `Just completed my ${activity.toLowerCase()} workout! 💪\n\n`;

  if (data.duration) {
    post += `⏱️ Duration: ${data.duration} minutes\n`;
  }

  if (data.distance) {
    post += `📏 Distance: ${data.distance} km\n`;
  }

  if (data.calories) {
    post += `🔥 Calories burned: ${data.calories}\n`;
  }

  if (data.notes) {
    post += `\n💭 Notes: ${data.notes}\n`;
  }

  post += `\n${generateHashtags(activity, data).join(" ")}`;

  return post;
};

function ActivityScreen() {
  const backgroundPrimary = useThemeColor({}, "backgroundPrimary");
  const userMessage = useThemeColor({}, "userMessage");

  const [currentStep, setCurrentStep] = useState<"select" | "form" | "post">(
    "select"
  );
  const [selectedActivity, setSelectedActivity] = useState<string>("");
  const [activityData, setActivityData] = useState<ActivityFormData | null>(
    null
  );
  const [postText, setPostText] = useState<string>("");

  const popularActivities = [
    { icon: "directions-run", title: "Run" },
    { icon: "directions-bike", title: "Cycle" },
    { icon: "pool", title: "Swim" },
    { icon: "self-improvement", title: "Yoga" },
  ];

  const allActivities = [
    { icon: "directions-run", title: "Run" },
    { icon: "directions-bike", title: "Cycle" },
    { icon: "pool", title: "Swim" },
    { icon: "self-improvement", title: "Yoga" },
    { icon: "sports-soccer", title: "Soccer" },
    { icon: "sports-basketball", title: "Basketball" },
    { icon: "sports-baseball", title: "Baseball" },
    { icon: "sports-tennis", title: "Tennis" },
    { icon: "sports-volleyball", title: "Volleyball" },
    { icon: "sports-football", title: "Football" },
    { icon: "sports-hockey", title: "Hockey" },
    { icon: "golf-course", title: "Golf" },
    { icon: "fitness-center", title: "Weightlifting" },
    { icon: "fitness-center", title: "Strength Training" },
    { icon: "directions-run", title: "Treadmill" },
    { icon: "more-horiz", title: "Other" },
  ];

  const handleActivityPress = (activity: string) => {
    setSelectedActivity(activity);
    setCurrentStep("form");
  };

  const handleFormBack = () => {
    setCurrentStep("select");
    setSelectedActivity("");
    setActivityData(null);
  };

  const handleFormSubmit = (data: ActivityFormData) => {
    setActivityData(data);
    const formattedPost = formatActivityPost(selectedActivity, data);
    setPostText(formattedPost);
    setCurrentStep("post");
  };

  const handlePostSubmit = () => {
    if (!postText.trim()) {
      Alert.alert("Error", "Please enter some content for your post");
      return;
    }

    // Here you would typically send the post to your backend

    Alert.alert(
      "Success!",
      "Your activity post has been shared successfully!",
      [
        {
          text: "OK",
          onPress: () => {
            setCurrentStep("select");
            setSelectedActivity("");
            setActivityData(null);
            setPostText("");
          },
        },
      ]
    );
  };

  const renderActivityGrid = (
    activities: { icon: string; title: string }[]
  ) => {
    const rows = [];
    for (let i = 0; i < activities.length; i += 2) {
      const row = (
        <HStack key={i} style={{ marginBottom: 12 }}>
          <ActivityItem
            icon={activities[i].icon}
            title={activities[i].title}
            onPress={() => handleActivityPress(activities[i].title)}
          />
          {activities[i + 1] && (
            <ActivityItem
              icon={activities[i + 1].icon}
              title={activities[i + 1].title}
              onPress={() => handleActivityPress(activities[i + 1].title)}
            />
          )}
        </HStack>
      );
      rows.push(row);
    }
    return rows;
  };

  // Show form if step is "form"
  if (currentStep === "form") {
    return (
      <ActivityForm
        activity={selectedActivity}
        onBack={handleFormBack}
        onSubmit={handleFormSubmit}
      />
    );
  }

  // Show post creation if step is "post"
  if (currentStep === "post") {
    return (
      <SafeAreaView
        style={{ backgroundColor: backgroundPrimary }}
        className="flex-1"
      >
        <View className="flex-1">
          {/* Header */}
          <Header
            title="Share Your Activity"
            isBack={true}
            onBackPress={() => {
              setCurrentStep("form");
            }}
            isSearch={false}
          />

          <PostCreation postText={postText} onPostTextChange={setPostText} />
        </View>
      </SafeAreaView>
    );
  }

  // Show activity selection
  return (
    <SafeAreaView
      style={{ backgroundColor: backgroundPrimary }}
      className="flex-1"
    >
      <View className="flex-1">
        {/* Header */}
        <Header
          title={`Activity`}
          isBack={false}
          onBackPress={() => router.back()}
        />

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="px-2.5">
            {/* Popular Section */}
            <ThemedText
              style={{ color: userMessage }}
              className="text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4"
            >
              Popular
            </ThemedText>

            <View className="px-2.5">
              {renderActivityGrid(popularActivities)}
            </View>

            {/* All Activities Section */}
            <ThemedText
              style={{ color: userMessage }}
              className="text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4"
            >
              All Activities
            </ThemedText>

            <View style={{ paddingHorizontal: 10, paddingBottom: 20 }}>
              {renderActivityGrid(allActivities)}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default withLogin(ActivityScreen);
