import fileUpload from "@/lib/fileUpload";
import { useStore } from "@/providers";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

const endpoint = `${process.env.EXPO_PUBLIC_API}/api/upload`;

const usePickImage = ({ onError }) => {
  const { session } = useStore();
  const token = session.accessToken;

  const [isUploading, setIsUploading] = useState(false);
  const upload = fileUpload(token, endpoint);

  const pickImage = async (): Promise<string[]> => {
    try {
      // Request permission
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        onError(
          "Permission Required",
          "Sorry, we need camera roll permissions to make this work!"
        );
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        const images = result.assets;
        setIsUploading(true);
        try {
          const imageUrls = await Promise.all(
            images.map((image) => upload(image.uri))
          );
          return imageUrls;
        } catch (error) {
          onError("Error", "Failed to upload image. Please try again.");
        } finally {
          setIsUploading(false);
        }
      }
    } catch (error) {
      onError("Error", "Failed to pick image. Please try again.");
    }
  };

  return {
    pickImage,
    isUploading,
  };
};

export default usePickImage;
