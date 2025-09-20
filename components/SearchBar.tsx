import { Icon } from "@/components/ui";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Fonts } from "../constants/Fonts";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  colors: {
    primaryText: string;
    secondaryText: string;
    backgroundSecondary: string;
    placeholder: string;
  };
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = "Search",
  colors,
}) => {
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.backgroundSecondary,
      borderRadius: 12,
      height: 48,
    },
    iconContainer: {
      paddingLeft: 16,
      paddingRight: 12,
      justifyContent: "center",
    },
    input: {
      flex: 1,
      color: colors.primaryText,
      fontSize: 16,
      fontFamily: Fonts.notoSans.regular,
      lineHeight: 20,
      paddingRight: 16,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.iconContainer}>
          <Icon name="search" size={20} color={colors.secondaryText} />
        </View>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          value={value}
          onChangeText={onChangeText}
          style={styles.input}
        />
      </View>
    </View>
  );
};
