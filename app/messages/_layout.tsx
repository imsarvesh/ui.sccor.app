import { Stack } from "expo-router";
import React from "react";

export default function MessagesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Messages",
        }}
      />
      <Stack.Screen
        name="[otherProfile]"
        options={{
          title: "Chat",
        }}
      />
    </Stack>
  );
}
