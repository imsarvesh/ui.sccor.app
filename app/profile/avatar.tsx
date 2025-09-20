import usePickImage from "@/hooks/usePickImage";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const avatarImages = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDnRzJJf290-bDNXPb054KwKkbDj2m0DDY7VFHLOtDs-tZr3gK7bwNKvBe9Gok6v1XlTo4NmUH7HCRydLQ9Egmv7P_UKLnTm43YU2VRqVaZeScNTRlv_B57D4Z-L1eJdLwQSiKyuhB7npPaqZZuqJmrstJpCfxBRc_EN7uStjJu9PLCtYGO_7rTzUXX8znYjg5Nofo7Uycend1HR4OJ8gcATV0ONU0PEC0AMSyYz_6rbjISqd73HjM0O6LzSm5kbsuOHxGGzyYMI1Y",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBJauW4REwxAYI_AeLRC7n9hqymKRhkdynKh4QExsk0A4MpvGWMItWkA_S_IBeDopyj-KKSUMAHx-MxB2iuAMPWP3LT50RM-1uIQNKagXFEyEhjWLUMocPqSonx0DhZBIZz2klko-JkBFGow7a4Syx37_Pzx_Kv7Mf5BlNcn9xisroxGCToiUVcBRVC2zq8UtRfh-7ENqjF8n9G7LnAt6gzr_yDqjLDpymmvzUrWl-UzcYzPcaV-e8FU4M7h0m67Yjm6BM-Z2mcrVI",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDBM1nLhXFXIqEOF1GuBVqNF2Mq268Xfd24oarNb2EgxPUKjLfOaKnn2BuHV9DhenNStI8GT2AFlo5PSsDsfHo0eSyoXTQlBw87AMen6q4sdQbUBZhOXeJ5KAxy5o2Evsn1m9yqNFfEOpDbWyjCFqVQ-N9o7hw8UK7X9pztP91ILp_k5YQcF_OeNQfhre-62ZdYn2fJ7IhbQwBduztLjtefZYNuEjBU-yG532p_V2ctSJVcTaWC_yLPM5JrEAVCx1BohNy3fklZwcU",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD2qxLrji7h_qycgjjclduFBQKQASkI2QDXF3BrYQnK3rgpJ5vg0M1bxNO3D8sPJcyQyvRWocBwig_URlrmdOM_FAH1vsF7CIAwA5xGXg1X1-tB5uHUYIPwokB1VSeFKT586PZG2Q63YmzfdRv8HMeHyJU5gQRpYx15ToQaMUGsos10nHmNUxZuC70bRlk5S7UmXew0M4x6Ray41436KFo6il_wIX7j1egJVi2gvvS1dthRoDqyvbqrG4K2rwvE_nEh-aKXxNaieIU",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAAJSLAfkcYQ39Q6wdwijPZZ_-cztl96ylHF3iU5Ct-i_sb3p1Qol03xjuzqvTl1ZMvKnB_nGpdCXpCiVtl0mIFAppiV8nliofEekdZqApMKT01gC5h3paU00TBM7mz46oEB6y2J31OD2xmrV7gsIv0dtVEldgCjRTTTq_AeWsiGzatXy_aV-2rxtleExh1cE2eMwdplF4DsIEHaeFvuIrLK-iaAZ82NMPSop45edS2xsDQ3MgYk2YdQXijByOzpbpdGqJwWcV6Enc",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDos8fGheDJEcUA0qamk6I6kpdVISCJOV9QEBvSQor1yx-SqPlResCkk3NavogNljWMBtCQ1mYhqucsV6fqMeQRxUqP7Nxu0XDt83_JKNMoQ-vEt1KVGiydhwsCHQ312x5rzjQtgowTjy1wcBEKcdLAG9hc-GPMH5uII2cZRiP-I5lDTJ1lYlNsM5AtLZOrHDO6PqUrKejHNhlO4CZUOa-uQ6KK_WZHutRA-KwjkzGmlepZ_L3xnG35Z4aQjfENjx5gVDy5mJpNb_I",
];

interface AvatarModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectAvatar: (avatarUrl: string) => void;
}

export default function AvatarModal({
  visible,
  onClose,
  onSelectAvatar,
}: AvatarModalProps) {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const { pickImage } = usePickImage({
    onError: Alert.alert,
  });

  const handleClose = () => {
    setSelectedAvatar(null);
    onClose();
  };

  const handleContinue = () => {
    if (selectedAvatar) {
      onSelectAvatar(selectedAvatar);
      setSelectedAvatar(null);
      onClose();
    }
  };

  const handleUpload = () => {
    // Handle upload logic here
    console.log("Upload photo");
    pickImage().then((imageUrls) => {
      if (imageUrls && imageUrls.length > 0) {
        onSelectAvatar(imageUrls[0]);
        onClose();
      }
    });
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose} style={styles.backButton}>
            <Ionicons name="close" size={24} color="#0d141c" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Choose your avatar</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Upload Section */}

          <View style={styles.uploadContainer}>
            <View style={styles.uploadContent}>
              <Text style={styles.uploadTitle}>Upload a photo</Text>
              <Text style={styles.uploadSubtitle}>
                Choose a photo from your library
              </Text>
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={handleUpload}
              >
                <Text style={styles.uploadButtonText}>Upload</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Avatar Grid */}
          <View style={styles.avatarGrid}>
            {avatarImages.map((avatar, index) => (
              <TouchableOpacity
                key={index}
                style={styles.avatarContainer}
                onPress={() => setSelectedAvatar(avatar)}
              >
                <Image
                  source={{ uri: avatar }}
                  style={[
                    styles.avatarImage,
                    selectedAvatar === avatar && styles.selectedAvatar,
                  ]}
                  alt="Avatar option"
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Bottom Button */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              !selectedAvatar && styles.continueButtonDisabled,
            ]}
            onPress={handleContinue}
            disabled={!selectedAvatar}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
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
    color: "#0d141c",
    textAlign: "center",
    paddingRight: 48,
  },
  headerSpacer: {
    width: 48,
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0d141c",
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 20,
  },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#cedbe8",
    paddingHorizontal: 16,
    gap: 32,
  },
  tab: {
    paddingVertical: 16,
    paddingBottom: 13,
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "#0d80f2",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#49739c",
  },
  activeTabText: {
    color: "#0d141c",
  },
  avatarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    gap: 12,
    paddingTop: 12,
  },
  avatarContainer: {
    width: (width - 64) / 2,
    aspectRatio: 1,
    paddingHorizontal: 16,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: (width - 64) / 4,
  },
  selectedAvatar: {
    borderWidth: 3,
    borderColor: "#0d80f2",
  },
  uploadContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  uploadContent: {
    alignItems: "center",
    gap: 24,
    paddingVertical: 56,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderColor: "#cedbe8",
    borderStyle: "dashed",
    borderRadius: 12,
  },
  uploadTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0d141c",
    textAlign: "center",
  },
  uploadSubtitle: {
    fontSize: 14,
    color: "#0d141c",
    textAlign: "center",
  },
  uploadButton: {
    backgroundColor: "#e7edf4",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 84,
  },
  uploadButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0d141c",
  },
  bottomContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#f8fafc",
  },
  continueButton: {
    backgroundColor: "#0d80f2",
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  continueButtonDisabled: {
    backgroundColor: "#cedbe8",
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#f8fafc",
  },
});
