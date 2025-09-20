import { Fonts } from "@/constants/Fonts";
import React from "react";
import { Image, StyleSheet, Text } from "react-native";

import { useStore } from "@/providers/PostProvider";

import { HStack, VStack } from "@/components/ui";
import { useThemeColor } from "@/hooks/useThemeColor";

const Post = () => {
  const post = useStore();
  const user = post.profile;

  const textColor = useThemeColor({}, "text");
  const iconColor = useThemeColor({}, "icon");
  const secondaryTextColor = useThemeColor(
    { light: "#9c4949", dark: "#a0a0a0" },
    "text"
  );
  const cardBackground = useThemeColor(
    { light: "#fcf8f8", dark: "#1a1a1a" },
    "background"
  );
  const shadowColor = useThemeColor({ light: "#000", dark: "#000" }, "text");

  const profileImage = user?.image ? { uri: user?.image } : user?.defaultImage;

  const styles = StyleSheet.create({
    post: {
      backgroundColor: cardBackground,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      shadowColor: shadowColor,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    postHeader: {
      alignItems: "center",
      marginBottom: 12,
    },
    postUserImage: {
      width: 56,
      height: 56,
      borderRadius: 28,
      marginRight: 16,
    },
    postUserInfo: {
      flex: 1,
    },
    postUserName: {
      fontSize: 16,
      fontFamily: Fonts.notoSans.medium,
      color: textColor,
    },
    postTimeAgo: {
      fontSize: 14,
      fontFamily: Fonts.notoSans.regular,
      color: secondaryTextColor,
      marginTop: 2,
    },
    postActionButton: {
      width: 28,
      height: 28,
      justifyContent: "center",
      alignItems: "center",
    },
    postContent: {
      marginBottom: 12,
    },
    postText: {
      fontSize: 16,
      fontFamily: Fonts.notoSans.regular,
      color: textColor,
      lineHeight: 24,
      marginBottom: 12,
    },
    postImage: {
      width: "100%",
      height: 200,
      borderRadius: 8,
    },
  });

  return (
    <HStack style={styles.postHeader}>
      <Image
        source={{
          uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlXu1dn4IN38F65vzxPDTG45ftnXxhmNpkjdJSd_OjElyCTdFyyhW_7kQcpLe2XZ7i65VUOibkr1HQCeNPDGzo12L3p6Avszg41u81mA9sfV_Hhpb-dhUmVvpmADtfqwHakrC68RrwqZeuB3xNE_QnY_N7CgN1tE4LNX0Rhd8k6Nk_CSCHesEEt7zk--jMb2kgzw_1DrHGAuLUhagKHI0AlANGok4hxLgznmDTvS0FEEYsq2-KUUi7ygUIgEbSy-vkES97bEx2QDU",
        }}
        alt="User profile picture"
        style={styles.postUserImage}
      />
      <VStack style={styles.postUserInfo}>
        <Text style={styles.postUserName}>{"John Doe"}</Text>
        <Text style={styles.postTimeAgo}>{"1d"}</Text>
      </VStack>
    </HStack>
  );
};

export default Post;
