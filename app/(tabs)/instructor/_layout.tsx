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
          title: "Instructors",
        }}
      />
      <Stack.Screen
        name="[instructor]"
        options={{
          title: "Instructor Profile",
        }}
      />
      <Stack.Screen
        name="search"
        options={{
          title: "Search Instructors",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
