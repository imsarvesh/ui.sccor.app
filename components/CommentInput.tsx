// Bright blue from the logo
const primaryBlue = "#0066FF";

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Fonts } from "../constants/Fonts";
import { useThemeColor } from "../hooks/useThemeColor";

interface CommentInputProps {
  onPostComment: (comment: string) => void;
  placeholder?: string;
}

const CommentInput: React.FC<CommentInputProps> = ({
  onPostComment,
  placeholder = "Add a comment...",
}) => {
  const [newComment, setNewComment] = useState("");

  const backgroundColor = useThemeColor({}, "backgroundPrimary");
  const textColor = useThemeColor({}, "primaryText");
  const secondaryTextColor = useThemeColor({}, "secondaryText");
  const tintColor = useThemeColor({}, "tint");
  const borderColor = useThemeColor({}, "border");

  const handlePostComment = () => {
    if (newComment.trim()) {
      onPostComment(newComment.trim());
      setNewComment("");
    }
  };

  const styles = StyleSheet.create({
    inputContainer: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: backgroundColor,
    },
    inputRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    userImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: borderColor,
    },
    inputWrapper: {
      flex: 1,
      flexDirection: "row",
      alignItems: "stretch",
      height: 48,
      borderRadius: 12,
      backgroundColor: borderColor,
      overflow: "hidden",
    },
    textInput: {
      flex: 1,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 16,
      fontFamily: Fonts.lexend.regular,
      color: textColor,
      textAlignVertical: "center",
    },
    postButtonContainer: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      justifyContent: "center",
    },
    postButton: {
      minWidth: 84,
      maxWidth: 480,
      height: 32,
      borderRadius: 16,
      backgroundColor: primaryBlue,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 16,
    },
    postButtonText: {
      fontSize: 14,
      fontFamily: Fonts.lexend.medium,
      color: backgroundColor,
    },
  });

  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputRow}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder={placeholder}
            placeholderTextColor={secondaryTextColor}
            value={newComment}
            onChangeText={setNewComment}
            multiline
            maxLength={500}
          />
          <View style={styles.postButtonContainer}>
            <TouchableOpacity
              style={styles.postButton}
              onPress={handlePostComment}
              disabled={!newComment.trim()}
            >
              <Text style={styles.postButtonText}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CommentInput;
