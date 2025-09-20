import { useThemeColor } from "@/hooks/useThemeColor";
import { styled } from "@gluestack-style/react";
import React from "react";
import { Pressable, View } from "react-native";
import { HStack } from "./ui/hstack";
import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";

const TickContainer = styled(
  View,
  {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  {
    componentName: "TickContainer",
  }
);

const DayContainer = styled(
  Pressable,
  {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 4,
    minWidth: 40,
  },
  {
    componentName: "DayContainer",
  }
);

export interface WeeklyTickProps {
  workoutDays: {
    [key: string]: boolean;
  };
  onDayPress?: (day: string) => void;
  size?: "small" | "medium" | "large";
  showLabels?: boolean;
}

const DAYS = [
  { key: "monday", label: "M", initial: "M" },
  { key: "tuesday", label: "T", initial: "T" },
  { key: "wednesday", label: "W", initial: "W" },
  { key: "thursday", label: "T", initial: "T" },
  { key: "friday", label: "F", initial: "F" },
  { key: "saturday", label: "S", initial: "S" },
  { key: "sunday", label: "S", initial: "S" },
];

export function WeeklyTick({
  workoutDays,
  onDayPress,
  size = "medium",
  showLabels = true,
}: WeeklyTickProps) {
  const backgroundColor = useThemeColor({}, "background");
  const borderColor = useThemeColor({}, "border");
  const textColor = useThemeColor({}, "text");
  const primaryColor = useThemeColor({}, "tint");

  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return { containerSize: 24, fontSize: 12, padding: 4 };
      case "large":
        return { containerSize: 40, fontSize: 16, padding: 8 };
      default:
        return { containerSize: 32, fontSize: 14, padding: 6 };
    }
  };

  const { containerSize, fontSize, padding } = getSizeStyles();

  const handleDayPress = (day: string) => {
    if (onDayPress) {
      onDayPress(day);
    }
  };

  return (
    <VStack style={{ alignItems: "center", gap: 8 }}>
      {showLabels && (
        <Text
          fontSize={fontSize}
          fontWeight="600"
          color={textColor}
          textAlign="center"
        >
          Weekly Workouts
        </Text>
      )}

      <HStack style={{ alignItems: "center", gap: 4 }}>
        {DAYS.map((day) => {
          const isCompleted = workoutDays[day.key] || false;

          return (
            <DayContainer
              key={day.key}
              onPress={() => handleDayPress(day.key)}
              disabled={!onDayPress}
            >
              <TickContainer
                style={{
                  width: containerSize,
                  height: containerSize,
                  borderRadius: containerSize / 2,
                  backgroundColor: isCompleted ? primaryColor : backgroundColor,
                  borderColor: isCompleted ? primaryColor : borderColor,
                  borderWidth: 2,
                }}
              >
                <Text
                  fontSize={fontSize - 2}
                  fontWeight="bold"
                  color={isCompleted ? "#FFFFFF" : textColor}
                >
                  {day.initial}
                </Text>
              </TickContainer>

              {showLabels && (
                <Text
                  fontSize={fontSize - 2}
                  fontWeight="500"
                  color={textColor}
                  marginTop={4}
                >
                  {day.label}
                </Text>
              )}
            </DayContainer>
          );
        })}
      </HStack>

      {showLabels && (
        <HStack style={{ gap: 16, marginTop: 8 }}>
          <HStack style={{ alignItems: "center", gap: 4 }}>
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: primaryColor,
                borderWidth: 2,
                borderColor: primaryColor,
              }}
            />
            <Text fontSize={fontSize - 2} color={textColor}>
              Completed
            </Text>
          </HStack>

          <HStack style={{ alignItems: "center", gap: 4 }}>
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: backgroundColor,
                borderWidth: 2,
                borderColor: borderColor,
              }}
            />
            <Text fontSize={fontSize - 2} color={textColor}>
              Missed
            </Text>
          </HStack>
        </HStack>
      )}
    </VStack>
  );
}
