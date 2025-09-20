import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../components";
import { Fonts } from "../constants/Fonts";
import { useThemeColor } from "../hooks/useThemeColor";

interface PrivacyModalProps {
  visible: boolean;
  onClose: () => void;
}

const PrivacyModal: React.FC<PrivacyModalProps> = ({ visible, onClose }) => {
  const backgroundColor = useThemeColor({}, "backgroundPrimary");
  const textColor = useThemeColor({}, "text");

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor }}>
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Header title="Privacy Policy" isBack={true} isSearch={false} />

        {/* Data Collection Section */}
        <View className="mb-6">
          <Text
            className="text-[22px] mb-3 mt-5 leading-7 tracking-[-0.33px]"
            style={{
              fontFamily: Fonts.lexend.bold,
              color: textColor,
            }}
          >
            Data Collection
          </Text>
          <Text
            className="text-base leading-6 mb-3 mt-1"
            style={{
              fontFamily: Fonts.lexend.regular,
              color: textColor,
            }}
          >
            We collect information you provide directly, such as your name,
            email, and athletic activities. We also gather data automatically,
            including device information and usage patterns.
          </Text>
        </View>

        {/* Data Usage Section */}
        <View className="mb-6">
          <Text
            className="text-[22px] mb-3 mt-5 leading-7 tracking-[-0.33px]"
            style={{
              fontFamily: Fonts.lexend.bold,
              color: textColor,
            }}
          >
            Data Usage
          </Text>
          <Text
            className="text-base leading-6 mb-3 mt-1"
            style={{
              fontFamily: Fonts.lexend.regular,
              color: textColor,
            }}
          >
            Your data helps us personalize your experience, improve our
            services, and communicate with you about updates and promotions. We
            may also use your data for research and analytics.
          </Text>
        </View>

        {/* Data Sharing Section */}
        <View className="mb-6">
          <Text
            className="text-[22px] mb-3 mt-5 leading-7 tracking-[-0.33px]"
            style={{
              fontFamily: Fonts.lexend.bold,
              color: textColor,
            }}
          >
            Data Sharing
          </Text>
          <Text
            className="text-base leading-6 mb-3 mt-1"
            style={{
              fontFamily: Fonts.lexend.regular,
              color: textColor,
            }}
          >
            We may share your information with third-party service providers who
            assist us in operating our platform. We do not sell your personal
            data to third parties.
          </Text>
        </View>

        {/* Data Security Section */}
        <View className="mb-6">
          <Text
            className="text-[22px] mb-3 mt-5 leading-7 tracking-[-0.33px]"
            style={{
              fontFamily: Fonts.lexend.bold,
              color: textColor,
            }}
          >
            Data Security
          </Text>
          <Text
            className="text-base leading-6 mb-3 mt-1"
            style={{
              fontFamily: Fonts.lexend.regular,
              color: textColor,
            }}
          >
            We employ industry-standard security measures, including encryption,
            to protect your data from unauthorized access and disclosure.
            However, no method of transmission over the internet is completely
            secure.
          </Text>
        </View>

        {/* User Rights Section */}
        <View className="mb-6">
          <Text
            className="text-[22px] mb-3 mt-5 leading-7 tracking-[-0.33px]"
            style={{
              fontFamily: Fonts.lexend.bold,
              color: textColor,
            }}
          >
            User Rights
          </Text>
          <Text
            className="text-base leading-6 mb-3 mt-1"
            style={{
              fontFamily: Fonts.lexend.regular,
              color: textColor,
            }}
          >
            You have the right to access, correct, or delete your personal
            information. You can also object to certain data processing
            activities. Contact us to exercise these rights.
          </Text>
        </View>

        {/* Footer */}
        <Text
          className="text-sm text-center mb-3 mt-1"
          style={{
            fontFamily: Fonts.lexend.regular,
            color: "#49739c",
          }}
        >
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Text>
        <View className="h-5" style={{ backgroundColor }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyModal;
