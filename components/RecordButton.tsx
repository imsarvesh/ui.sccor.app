import { Box, Button, ButtonText } from "@/components/ui";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { VStack } from "./ui/vstack";
import { WeeklyTick } from "./WeeklyTick";

interface RecordButtonProps {
  onPress?: () => void;
}

const RecordButton: React.FC<RecordButtonProps> = ({ onPress }) => {
  const [workoutDays] = useState({
    monday: true,
    tuesday: false,
    wednesday: true,
    thursday: true,
    friday: false,
    saturday: true,
    sunday: false,
  });

  const backgroundColor = useThemeColor({}, "background");

  const handleRecordPress = () => {
    onPress?.();
  };

  return (
    <>
      <VStack space="lg" style={{ backgroundColor }}>
        <VStack space="md">
          <WeeklyTick
            workoutDays={workoutDays}
            size="medium"
            showLabels={false}
            onDayPress={() => {
              router.push("/(tabs)/activity/workout");
            }}
          />
        </VStack>
      </VStack>
      <Box className="py-3 px-4">
        <Button
          className="bg-red-600 rounded-2xl px-4 py-2.5 flex-row items-center gap-2"
          onPress={handleRecordPress}
        >
          <Ionicons name="videocam" size={20} color="#fcf8f8" />
          <ButtonText className="text-gray-50 text-sm font-bold">
            Record Activity
          </ButtonText>
        </Button>
      </Box>
    </>
  );
};

export default RecordButton;
