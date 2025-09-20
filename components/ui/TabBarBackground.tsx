import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

// This is a shim for web and Android where the tab bar is generally opaque.
export default function TabBarBackground() {
  const backgroundColor = useThemeColor({}, "backgroundPrimary");
  const borderColor = useThemeColor({}, "border");

  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        {
          backgroundColor: backgroundColor,
          borderTopWidth: 1,
          borderTopColor: borderColor,
        }
      ]}
    />
  );
}

export function useBottomTabOverflow() {
  return 0;
}
