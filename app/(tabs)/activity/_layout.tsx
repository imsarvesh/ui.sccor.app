import { Stack } from "expo-router";
import React from "react";

export default function InstructorLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Activity",
        }}
      />
      <Stack.Screen
        name="workout"
        options={{
          title: "Workout",
        }}
      />
    </Stack>
  );
}
