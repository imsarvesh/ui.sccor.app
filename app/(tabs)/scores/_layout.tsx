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
          title: "Scores",
        }}
      />
      <Stack.Screen
        name="[matchId]"
        options={{
          title: "Score Details",
        }}
      />
    </Stack>
  );
}
