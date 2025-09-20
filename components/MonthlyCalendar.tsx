import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useState } from "react";
import { View } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import PostItem from "./PostItem";
import { Text } from "./ui/text";

export interface WorkoutPost {
  id: number;
  user: {
    name: string;
    image: string;
    timeAgo: string;
  };
  content: string;
  likes: number;
  comments: number;
  type: "text" | "image" | "scoreboard";
  image?: string;
  scoreboard?: {
    player1: { name: string; scores: number[] };
    player2: { name: string; scores: number[] };
  };
}

export interface MonthlyCalendarProps {
  activityData: {
    [date: string]: {
      completed: boolean;
      count?: number;
    };
  };
  workoutData?: {
    [date: string]: WorkoutPost;
  };
  onDayPress?: (date: string) => void;
  onMonthChange?: (year: number, month: number) => void;
  size?: "small" | "medium" | "large";
  showNavigation?: boolean;
  showActivityCount?: boolean;
  showWorkoutPost?: boolean;
}

export function MonthlyCalendar({
  activityData,
  workoutData = {},
  onDayPress,
  onMonthChange,
  size = "medium",
  showNavigation = true,
  showActivityCount = true,
  showWorkoutPost = true,
}: MonthlyCalendarProps) {
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);

  const backgroundColor = useThemeColor({}, "background");
  const borderColor = useThemeColor({}, "border");
  const textColor = useThemeColor({}, "text");
  const primaryColor = useThemeColor({}, "tint");
  const secondaryColor = useThemeColor({}, "backgroundSecondary");

  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return {
          fontSize: 12,
          headerFontSize: 10,
          padding: 8,
          calendarHeight: 280,
        };
      case "large":
        return {
          fontSize: 16,
          headerFontSize: 14,
          padding: 12,
          calendarHeight: 400,
        };
      default:
        return {
          fontSize: 14,
          headerFontSize: 12,
          padding: 10,
          calendarHeight: 320,
        };
    }
  };

  const { fontSize, headerFontSize, padding, calendarHeight } = getSizeStyles();

  // Convert activity data to calendar marked dates format
  const getMarkedDates = () => {
    const markedDates: any = {};

    Object.keys(activityData).forEach((date) => {
      const activity = activityData[date];
      const isCompleted = activity?.completed || false;
      const activityCount = activity?.count || 0;

      markedDates[date] = {
        marked: showActivityCount && activityCount > 0,
        dotColor: isCompleted ? primaryColor : borderColor,
        textColor: isCompleted ? "#FFFFFF" : textColor,
        selectedColor: isCompleted ? primaryColor : secondaryColor,
        selectedTextColor: isCompleted ? "#FFFFFF" : textColor,
        customStyles: {
          container: {
            backgroundColor: isCompleted ? primaryColor : backgroundColor,
            borderWidth: 2,
            borderColor: isCompleted ? primaryColor : borderColor,
            borderRadius: 20,
          },
          text: {
            color: isCompleted ? "#FFFFFF" : textColor,
            fontWeight: "600",
          },
        },
      };
    });

    return markedDates;
  };

  const handleDayPress = (day: DateData) => {
    const dateString = day.dateString;
    setSelectedDate(dateString);

    if (onDayPress) {
      onDayPress(dateString);
    }
  };

  const handleMonthChange = (month: any) => {
    if (onMonthChange) {
      onMonthChange(month.year, month.month - 1);
    }
  };

  const getSelectedDateWorkout = () => {
    return workoutData[selectedDate];
  };

  const formatSelectedDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });
    }
  };

  const getTextSize = (baseSize: number) => {
    if (baseSize <= 10) return "xs";
    if (baseSize <= 12) return "sm";
    if (baseSize <= 14) return "md";
    if (baseSize <= 16) return "lg";
    if (baseSize <= 18) return "xl";
    return "2xl";
  };

  return (
    <View style={{ padding }}>
      <Calendar
        current={today}
        onDayPress={handleDayPress}
        onMonthChange={handleMonthChange}
        markedDates={getMarkedDates()}
        markingType="custom"
        theme={{
          backgroundColor: backgroundColor,
          calendarBackground: backgroundColor,
          textSectionTitleColor: textColor,
          selectedDayBackgroundColor: primaryColor,
          selectedDayTextColor: "#FFFFFF",
          todayTextColor: primaryColor,
          dayTextColor: textColor,
          textDisabledColor: borderColor,
          dotColor: primaryColor,
          selectedDotColor: "#FFFFFF",
          arrowColor: primaryColor,
          monthTextColor: textColor,
          indicatorColor: primaryColor,
          textDayFontSize: fontSize - 2,
          textMonthFontSize: fontSize + 2,
          textDayHeaderFontSize: headerFontSize,
          textDayFontWeight: "600",
          textMonthFontWeight: "bold",
          textDayHeaderFontWeight: "600",
        }}
        style={{
          height: calendarHeight,
          borderWidth: 0,
          borderRadius: 12,
          width: "100%",
        }}
        hideExtraDays={true}
        disableMonthChange={!showNavigation}
        hideArrows={!showNavigation}
      />

      {/* Legend */}
      <View
        style={{
          flexDirection: "row",
          marginTop: 16,
          gap: 16,
          justifyContent: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <View
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              borderWidth: 2,
              backgroundColor: primaryColor,
              borderColor: primaryColor,
            }}
          />
          <Text size={getTextSize(fontSize - 2)} style={{ color: textColor }}>
            Active
          </Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <View
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              borderWidth: 2,
              backgroundColor: backgroundColor,
              borderColor: borderColor,
            }}
          />
          <Text size={getTextSize(fontSize - 2)} style={{ color: textColor }}>
            Inactive
          </Text>
        </View>
      </View>

      {/* Workout Post Section */}
      {showWorkoutPost && (
        <View style={{ marginTop: 24, paddingHorizontal: 16 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <Text
              size={getTextSize(fontSize)}
              bold
              style={{ color: textColor }}
            >
              {formatSelectedDate(selectedDate)}&apos;s Workout
            </Text>
          </View>

          {getSelectedDateWorkout() ? (
            <PostItem
              post={{
                id: getSelectedDateWorkout()!.id,
                user: getSelectedDateWorkout()!.user,
                content: getSelectedDateWorkout()!.content,
                likes: getSelectedDateWorkout()!.likes,
                comments: getSelectedDateWorkout()!.comments,
                type: getSelectedDateWorkout()!.type,
                image: getSelectedDateWorkout()!.image,
                scoreboard: getSelectedDateWorkout()!.scoreboard,
              }}
            />
          ) : (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 40,
                paddingHorizontal: 20,
                borderRadius: 12,
                borderWidth: 1,
                borderStyle: "dashed",
                borderColor: borderColor,
                backgroundColor: secondaryColor,
              }}
            >
              <Text
                size={getTextSize(fontSize - 2)}
                style={{ color: textColor, textAlign: "center" }}
              >
                No Workout
              </Text>
              <Text
                size={getTextSize(fontSize - 4)}
                style={{
                  color: borderColor,
                  textAlign: "center",
                  marginTop: 4,
                }}
              >
                No workout recorded for this day
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}
