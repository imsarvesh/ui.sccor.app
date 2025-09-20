import { Icon } from "@/components/ui";
import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Fonts } from "../constants/Fonts";

interface ChatInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend?: () => void;
  placeholder?: string;
  colors: {
    primaryText: string;
    secondaryText: string;
    backgroundSecondary: string;
    placeholder: string;
  };
}

export const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChangeText,
  onSend,
  placeholder = "Start a message",
  colors,
}) => {
  const styles = StyleSheet.create({
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
      gap: 12,
    },
    inputWrapper: {
      flex: 1,
      minWidth: 160,
      height: 48,
    },
    inputInner: {
      flexDirection: "row",
      flex: 1,
      borderRadius: 12,
      height: "100%",
    },
    textInput: {
      flex: 1,
      backgroundColor: colors.backgroundSecondary,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 16,
      fontFamily: Fonts.notoSans.regular,
      color: colors.primaryText,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
    inputActions: {
      backgroundColor: colors.backgroundSecondary,
      borderTopRightRadius: 12,
      borderBottomRightRadius: 12,
      paddingRight: 16,
      justifyContent: "center",
    },
    actionButtons: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    actionButton: {
      padding: 6,
    },
  });

  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputWrapper}>
        <View style={styles.inputInner}>
          <TextInput
            style={styles.textInput}
            placeholder={placeholder}
            placeholderTextColor={colors.placeholder}
            value={value}
            onChangeText={onChangeText}
            multiline
          />
          <View style={styles.inputActions}>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionButton}>
                <Icon
                  name="camera-alt"
                  size={20}
                  color={colors.secondaryText}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Icon name="image" size={20} color={colors.secondaryText} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
