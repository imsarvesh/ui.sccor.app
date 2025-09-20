import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Box } from "@/components/ui";
import { useThemeColor } from "../hooks/useThemeColor";
import NotificationItem from "./NotificationItem";

interface NotificationData {
  id: string;
  name: string;
  message: string;
  avatar: string;
  type: "follower" | "like" | "comment";
}

interface NotificationListProps {
  notifications: NotificationData[];
}

const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
}) => {
  const backgroundColor = useThemeColor({}, "background");

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: backgroundColor,
    },
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          name={notification.name}
          message={notification.message}
          avatar={notification.avatar}
        />
      ))}
    </ScrollView>
  );
};

export default NotificationList;
