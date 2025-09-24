import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { HStack } from "./ui/hstack";
import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";

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
        return { containerSize: 24, textSize: "xs", padding: 4 };
      case "large":
        return { containerSize: 40, textSize: "lg", padding: 8 };
      default:
        return { containerSize: 32, textSize: "sm", padding: 6 };
    }
  };

  const { containerSize, textSize, padding } = getSizeStyles();

  const handleDayPress = (day: string) => {
    if (onDayPress) {
      onDayPress(day);
    }
  };

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      gap: 8,
    },
    dayRow: {
      alignItems: "center",
      gap: 4,
    },
    dayContainer: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 8,
      paddingHorizontal: 4,
      minWidth: 40,
    },
    tickContainer: {
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
    },
    legendRow: {
      gap: 16,
      marginTop: 8,
    },
    legendItem: {
      alignItems: "center",
      gap: 4,
    },
    legendDot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      borderWidth: 2,
    },
  });

  return (
    <VStack style={styles.container}>
      {showLabels && (
        <Text
          size={textSize}
          bold
          style={{ color: textColor, textAlign: "center" }}
        >
          Weekly Workouts
        </Text>
      )}

      <HStack style={styles.dayRow}>
        {DAYS.map((day) => {
          const isCompleted = workoutDays[day.key] || false;

          return (
            <Pressable
              key={day.key}
              style={styles.dayContainer}
              onPress={() => handleDayPress(day.key)}
              disabled={!onDayPress}
            >
              <View
                style={[
                  styles.tickContainer,
                  {
                    width: containerSize,
                    height: containerSize,
                    borderRadius: containerSize / 2,
                    backgroundColor: isCompleted
                      ? primaryColor
                      : backgroundColor,
                    borderColor: isCompleted ? primaryColor : borderColor,
                  },
                ]}
              >
                <Text
                  size={
                    size === "small" ? "2xs" : size === "large" ? "md" : "xs"
                  }
                  bold
                  style={{ color: isCompleted ? "#FFFFFF" : textColor }}
                >
                  {day.initial}
                </Text>
              </View>

              {showLabels && (
                <Text
                  size={
                    size === "small" ? "2xs" : size === "large" ? "sm" : "xs"
                  }
                  style={{ color: textColor, marginTop: 4 }}
                >
                  {day.label}
                </Text>
              )}
            </Pressable>
          );
        })}
      </HStack>

      {showLabels && (
        <HStack style={styles.legendRow}>
          <HStack style={styles.legendItem}>
            <View
              style={[
                styles.legendDot,
                {
                  backgroundColor: primaryColor,
                  borderColor: primaryColor,
                },
              ]}
            />
            <Text
              size={size === "small" ? "2xs" : size === "large" ? "sm" : "xs"}
              style={{ color: textColor }}
            >
              Completed
            </Text>
          </HStack>

          <HStack style={styles.legendItem}>
            <View
              style={[
                styles.legendDot,
                {
                  backgroundColor: backgroundColor,
                  borderColor: borderColor,
                },
              ]}
            />
            <Text
              size={size === "small" ? "2xs" : size === "large" ? "sm" : "xs"}
              style={{ color: textColor }}
            >
              Missed
            </Text>
          </HStack>
        </HStack>
      )}
    </VStack>
  );
}
