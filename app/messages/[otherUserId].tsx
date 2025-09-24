import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChatHeader, ChatInput, Header, MessageBubble } from "../../components";
import { Colors } from "../../constants/Colors";
import { Fonts } from "../../constants/Fonts";
import { useColorScheme } from "../../hooks/useColorScheme";
import withLogin from "@/components/withLogin";
import { useLocalSearchParams, useSearchParams } from "expo-router/build/hooks";
import useDirectMessages from "@/service/hooks/useDM";
import { useStore } from "@/providers";
import useSendDM from "@/service/hooks/useSendDM";
import { useProfileByUserId } from "@/hooks/useProfile";

interface ChatPageParams {
  selectedMessage?: {
    id: number;
    name: string;
    message: string;
    date: string;
    avatar: string;
  };
}

// Mock chat messages for the selected conversation
const chatMessages = [
  {
    id: 1,
    text: "Hey, I'm heading to the gym for a quick workout. Are you going to be around?",
    isFromUser: true,
    timestamp: "2:30 PM",
    sender: "Liam",
    hasImage: true,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDYfUXeslSNrmnivVSNX90QbYVJ959T4tt_BeL8Xkbk0fNEiRv5qugDW56fIJiWQoh_c4dxVS9_c1TwFVyB16NNnhNpgj8tI6il0QDgW3b0UcRZDzpsPeAOx8Yn2l1fiOm2VEkezorYx6XY2g2owHPx961trf5luDl1Z7gJKxmSm84Ab8V7i0CFELIFiC-bRVTf6pZWFIJk8rzP0h4iYgbZ6ECYJthNfj90dwjniGTJJwX2bDp2sX4Z9213W8BQ8IG1KN2hVvNoq-w",
  },
  {
    id: 2,
    text: "For sure!",
    isFromUser: false,
    timestamp: "2:32 PM",
    sender: "Ethan",
  },
  {
    id: 3,
    text: "Don't forget to bring your water bottle.",
    isFromUser: false,
    timestamp: "2:35 PM",
    sender: "Ethan",
  },
  {
    id: 4,
    text: "Good tip, I will",
    isFromUser: true,
    timestamp: "2:37 PM",
    sender: "Liam",
  },
];

const ChatPage: React.FC = () => {
  const { me } = useStore();
  const { otherUserId }: { otherUserId: string } = useLocalSearchParams();
  const [newMessage, setNewMessage] = useState("");
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const navigation = useNavigation();
  const { isLoading, error, messages } = useDirectMessages({
    otherUserId: otherUserId,
  });
  const { profile } = useProfileByUserId(otherUserId);

  const { sendDM, isLoading: isSending } = useSendDM();

  const handleSend = () => {
    if (newMessage.trim()) {
      sendDM(otherUserId, newMessage);
      setNewMessage("");
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundPrimary,
    },
    dateHeader: {
      fontSize: 14,
      fontFamily: Fonts.notoSans.bold,
      color: colors.secondaryText,
      textAlign: "center",
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
    chatContainer: {
      flex: 1,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Header */}
        <ChatHeader
          title={profile?.name || "Loading..."}
          onBack={handleBack}
          rightAction={{
            icon: "more-vert",
            onPress: () => {
              console.log("Menu pressed");
            },
          }}
          colors={colors}
        />

        {/* Date Header */}
        <Text style={styles.dateHeader}>November 11, 2022</Text>

        {/* Chat Messages */}
        <ScrollView style={styles.chatContainer}>
          {messages?.messages?.map?.((message) => (
            <MessageBubble
              key={message.id}
              text={message.message}
              isFromUser={message.from.id === me?.id}
              sender={message.from.name}
              timestamp={message.createdAt}
              hasImage={false}
              imageUrl={null}
              colors={colors}
            />
          ))}
        </ScrollView>

        {/* Input Area */}
        <ChatInput
          value={newMessage}
          onChangeText={setNewMessage}
          onSend={handleSend}
          colors={colors}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default withLogin(ChatPage);
