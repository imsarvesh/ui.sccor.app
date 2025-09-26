import { useThemeColor } from "@/hooks/useThemeColor";

import { useDispatch, useStore } from "@/providers";
import EDITMYPROFILE from "@/service/mutation/editMyProfile";
import { useMutation } from "@apollo/client/react";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AvatarModal from "./avatar";
import { SafeAreaView } from "@/components/ui";

export default function EditProfileScreen() {
  const { me } = useStore();
  const dispatch = useDispatch();
  const [editMyProfile, { loading: isSaving }] = useMutation(EDITMYPROFILE);
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const secondaryTextColor = useThemeColor({}, "secondaryText");
  const borderColor = useThemeColor({}, "border");
  const backgroundSecondary = useThemeColor({}, "backgroundSecondary");

  const [formData, setFormData] = useState({
    ...me,
  });

  const [isAvatarModalVisible, setIsAvatarModalVisible] = useState(false);

  if (!me) return <Redirect href="/+not-found" />;

  const handleBack = () => {
    router.back();
  };

  const handleSave = () => {
    // Handle save logic here
    // router.back();
    const { name, image, bio, location, website, birthdate } = formData;

    editMyProfile({
      variables: {
        newProfile: { name, image, bio, location, website, birthdate },
      },
    })
      .then(({ data }: any) => {
        setFormData(data.profile);
        dispatch({
          type: "updateMyProfile",
          payload: data.profile,
        });
        router.back();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangePhoto = () => {
    setIsAvatarModalVisible(true);
  };

  const handleCloseAvatarModal = () => {
    setIsAvatarModalVisible(false);
  };

  const handleSelectAvatar = (avatarUrl: string) => {
    setFormData((prev) => ({ ...prev, image: avatarUrl }));
  };

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="close" size={24} color={textColor} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Photo Section */}
        <View style={styles.photoSection}>
          <View style={styles.photoContainer}>
            <Image
              source={{
                uri: formData.image,
              }}
              style={styles.profilePhoto}
              alt="Profile photo"
            />
            <TouchableOpacity
              style={styles.changePhotoButton}
              onPress={handleChangePhoto}
            >
              <Ionicons name="camera" size={20} color="#0d80f2" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.changePhotoTextButton}
            onPress={handleChangePhoto}
          >
            <Text style={[styles.changePhotoText, { color: textColor }]}>
              Change Profile Photo
            </Text>
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        <View style={styles.formSection}>
          <View style={styles.formField}>
            <Text style={[styles.fieldLabel, { color: textColor }]}>Name</Text>
            <TextInput
              style={[
                styles.textInput,
                {
                  color: textColor,
                  borderColor: borderColor,
                  backgroundColor: backgroundSecondary,
                },
              ]}
              value={formData.name}
              onChangeText={(value) => updateFormData("name", value)}
              placeholder="Enter your name"
              placeholderTextColor={secondaryTextColor}
            />
          </View>

          <View style={styles.formField}>
            <Text style={[styles.fieldLabel, { color: textColor }]}>
              Username
            </Text>
            <TextInput
              style={[
                styles.textInput,
                {
                  color: textColor,
                  borderColor: borderColor,
                  backgroundColor: backgroundSecondary,
                },
              ]}
              value={formData.username}
              onChangeText={(value) => updateFormData("username", value)}
              placeholder="Enter username"
              placeholderTextColor={secondaryTextColor}
            />
          </View>

          <View style={styles.formField}>
            <Text style={[styles.fieldLabel, { color: textColor }]}>Email</Text>
            <TextInput
              style={[
                styles.textInput,
                {
                  color: textColor,
                  borderColor: borderColor,
                  backgroundColor: backgroundSecondary,
                },
              ]}
              value={formData.email}
              onChangeText={(value) => updateFormData("email", value)}
              placeholder="Enter your email"
              placeholderTextColor={secondaryTextColor}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.formField}>
            <Text style={[styles.fieldLabel, { color: textColor }]}>Bio</Text>
            <TextInput
              style={[
                styles.textArea,
                {
                  color: textColor,
                  borderColor: borderColor,
                  backgroundColor: backgroundSecondary,
                },
              ]}
              value={formData.bio}
              onChangeText={(value) => updateFormData("bio", value)}
              placeholder="Tell us about yourself"
              placeholderTextColor={secondaryTextColor}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.formField}>
            <Text style={[styles.fieldLabel, { color: textColor }]}>
              Location
            </Text>
            <TextInput
              style={[
                styles.textInput,
                {
                  color: textColor,
                  borderColor: borderColor,
                  backgroundColor: backgroundSecondary,
                },
              ]}
              value={formData.location}
              onChangeText={(value) => updateFormData("location", value)}
              placeholder="Enter your location"
              placeholderTextColor={secondaryTextColor}
            />
          </View>

          <View style={styles.formField}>
            <Text style={[styles.fieldLabel, { color: textColor }]}>
              Website
            </Text>
            <TextInput
              style={[
                styles.textInput,
                {
                  color: textColor,
                  borderColor: borderColor,
                  backgroundColor: backgroundSecondary,
                },
              ]}
              value={formData.website}
              onChangeText={(value) => updateFormData("website", value)}
              placeholder="Enter your website URL"
              placeholderTextColor={secondaryTextColor}
              keyboardType="url"
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Privacy Settings */}
        <View style={styles.privacySection}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            Privacy
          </Text>

          <View
            style={[styles.privacyItem, { borderBottomColor: borderColor }]}
          >
            <View style={styles.privacyItemContent}>
              <Text style={[styles.privacyItemTitle, { color: textColor }]}>
                Private Account
              </Text>
              <Text
                style={[
                  styles.privacyItemSubtitle,
                  { color: secondaryTextColor },
                ]}
              >
                Only approved followers can see your posts
              </Text>
            </View>
            <TouchableOpacity style={styles.toggleButton}>
              <View style={styles.toggleOff} />
            </TouchableOpacity>
          </View>

          <View
            style={[styles.privacyItem, { borderBottomColor: borderColor }]}
          >
            <View style={styles.privacyItemContent}>
              <Text style={[styles.privacyItemTitle, { color: textColor }]}>
                Show Activity Status
              </Text>
              <Text
                style={[
                  styles.privacyItemSubtitle,
                  { color: secondaryTextColor },
                ]}
              >
                Let others see when youre active
              </Text>
            </View>
            <TouchableOpacity style={styles.toggleButton}>
              <View style={styles.toggleOn} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Avatar Modal */}
      <AvatarModal
        visible={isAvatarModalVisible}
        onClose={handleCloseAvatarModal}
        onSelectAvatar={handleSelectAvatar}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 8,
  },
  backButton: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    paddingRight: 48,
  },
  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#0d80f2",
    borderRadius: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0d80f2",
  },
  content: {
    flex: 1,
  },
  photoSection: {
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  photoContainer: {
    position: "relative",
    marginBottom: 16,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changePhotoButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f8fafc",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#0d80f2",
  },
  changePhotoTextButton: {
    paddingVertical: 8,
  },
  changePhotoText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0d80f2",
  },
  formSection: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  formField: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  textInput: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  privacySection: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  privacyItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  privacyItemContent: {
    flex: 1,
    marginRight: 16,
  },
  privacyItemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  privacyItemSubtitle: {
    fontSize: 14,
  },
  toggleButton: {
    width: 44,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#cedbe8",
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  toggleOff: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#f8fafc",
    alignSelf: "flex-start",
  },
  toggleOn: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#0d80f2",
    alignSelf: "flex-end",
  },
});
