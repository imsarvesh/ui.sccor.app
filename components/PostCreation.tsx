import { useThemeColor } from "@/hooks/useThemeColor";
import { useAddPost } from "@/service/hooks/usePost";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface PostCreationProps {
  postText: string;
  onPostTextChange: (text: string) => void;
  onPostCreated?: () => void;
}

const PostCreation: React.FC<PostCreationProps> = ({
  postText,
  onPostTextChange,
  onPostCreated,
}) => {
  const colors = useThemeColor({}, "backgroundSecondary");
  const border = useThemeColor({}, "border");
  const primary = useThemeColor({}, "primaryText");
  const muted = useThemeColor({}, "placeholder");
  const icon = useThemeColor({}, "icon");
  const accent = useThemeColor({}, "tabIconSelected");

  const { addPost, response } = useAddPost();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitPost = async () => {
    console.log("handleSubmitPost", postText);
    if (!postText.trim()) {
      Alert.alert("Error", "Please enter some text for your post");
      return;
    }

    setIsSubmitting(true);
    try {
      await addPost(postText.trim());
      onPostTextChange(""); // Clear the input
      onPostCreated?.(); // Call the callback if provided
    } catch (error) {
      console.error("Error creating post:", error);
      Alert.alert("Error", "Failed to create post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isPostButtonEnabled = postText.trim().length > 0 && !isSubmitting;

  return (
    <View className="px-4 py-3">
      <View
        className="flex-row rounded-xl p-3"
        style={{
          backgroundColor: colors,
          borderColor: border,
          borderWidth: 1,
        }}
      >
        <Image
          source={{
            uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuC5SVfBpkTZvGqfzCX5jLR-8AzIHHyJ-jlC_QAjH9X8SEh7hNr8J90I84zanbPOaUiJ2yEeKb2El1LE-dof_o8cD2RqgL_zFbrdJjG5Q9w2vxWZ-c0cJSQMPfsm85-dbLDpi-ta1hqodXcN63ORthGfKzNV54D1K95HRWKZvTIH534PxHwHiz1SB-PCDnRihdsmPXVzEA_3P2iF8C0zWJKBckNax9dMt63beI6OwjAVhwzVgk-9DDdtT8rWOz6a23p-2tOoWLtbOTZc",
          }}
          alt="User profile picture"
          className="w-10 h-10 rounded-full mr-3"
        />
        <View className="flex-1">
          <TextInput
            className="text-base min-h-[60px] text-top"
            style={{ color: primary }}
            placeholder="What's on your mind?"
            placeholderTextColor={muted}
            multiline
            value={postText}
            onChangeText={onPostTextChange}
            editable={!isSubmitting}
          />
          <View className="flex-row justify-between items-center mt-2">
            <View className="flex-row">
              <TouchableOpacity className="p-1.5 mr-1" disabled={isSubmitting}>
                <Ionicons name="camera-outline" size={20} color={icon} />
              </TouchableOpacity>
              <TouchableOpacity className="p-1.5 mr-1" disabled={isSubmitting}>
                <Ionicons name="image-outline" size={20} color={icon} />
              </TouchableOpacity>
              <TouchableOpacity className="p-1.5 mr-1" disabled={isSubmitting}>
                <Ionicons name="videocam-outline" size={20} color={icon} />
              </TouchableOpacity>
              <TouchableOpacity className="p-1.5 mr-1" disabled={isSubmitting}>
                <Ionicons name="person-add-outline" size={20} color={icon} />
              </TouchableOpacity>
              <TouchableOpacity className="p-1.5 mr-1" disabled={isSubmitting}>
                <Ionicons name="location-outline" size={20} color={icon} />
              </TouchableOpacity>
              <TouchableOpacity className="p-1.5 mr-1" disabled={isSubmitting}>
                <Ionicons name="happy-outline" size={20} color={icon} />
              </TouchableOpacity>
              <TouchableOpacity className="p-1.5 mr-1" disabled={isSubmitting}>
                <Ionicons name="calendar-outline" size={20} color={icon} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              className={`px-4 py-2 rounded-full ${
                isPostButtonEnabled ? "opacity-100" : "opacity-50"
              }`}
              style={{
                backgroundColor: isPostButtonEnabled ? accent : muted,
              }}
              onPress={handleSubmitPost}
              disabled={!isPostButtonEnabled}
            >
              <Text className="text-white">Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PostCreation;
