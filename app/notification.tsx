import { Box } from "@/components/ui";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ActionButton,
  ModalHeader,
  NotificationList,
  NotificationTabs,
} from "../components";
import { useThemeColor } from "../hooks/useThemeColor";

interface NotificationModalProps {
  visible: boolean;
  onClose: () => void;
}

interface NotificationData {
  id: string;
  name: string;
  message: string;
  avatar: string;
  type: "follower" | "like" | "comment";
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  visible,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<"all" | "followers" | "likes">(
    "all"
  );

  const backgroundColor = useThemeColor({}, "background");

  // Mock notification data based on updated HTML design
  const allNotifications: NotificationData[] = [
    {
      id: "1",
      name: "Ethan Blake",
      message: "Started following you",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD4elI8bMucsc_dat1cOp9KA6hU7ZUd3h9TgEMkN_wLWbhSZ-gKgjRnXIvr9K2VzdVSt5U9s2YsS0TpvyawPxuXVkd8xKxm_S7Q6Qxcga5XIoaHjoy0S1nBCBIdh9oNStXdJVuVKbsIrhEese9eyTwP4gTpWsfLMUYc2CdjVm6e8Smup4MbujJ5dSstU81341_ek_gAmMnbl64ju1_1VOdFPUu1wxj20tEinjpXJq74yJM6YX12sLfX3qyojY_YDX1636Y6MX_y3fY",
      type: "follower",
    },
    {
      id: "2",
      name: "Isabella Carter",
      message: "Liked your post",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAtzwvxp0w6njsdvnCaSKQvr92e2cZm9G7em4d5W3C8wO_Czy8JngYOkDx-2vxzQ4ZB0KA_MXDXWeOpUtBXs6Ue8t1QTKory4Q77LuKx3zQ_tpi8RhSbDtfvsa85l5Qq1VpVgsoxUjiT9pL0MlweGVyTYSB-TvOWKEZPz2Av2WRIMFRqOch_kAg8omh7zafSJdc2SDkqn0e1muwfzhmNxW7fWX4DvAXh2RioWpyKutY6Ze0azPOeUHeUwQKGwqAfUp7wPcbQL7cD2s",
      type: "like",
    },
    {
      id: "3",
      name: "Owen Hayes",
      message: "Commented on your post",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBHh1g2USJcXtaQkIlLcIUbanswIbe_UaFdWlQC_7vibcqTTY51qyOOW9hND5TNjZEiZWExoV8U9_fRaV7WwYrDP05Ry49zpoEYwkTGh3aS29p4MpgL86bw10r-yk8YzNXEPY-2nEaBFTZwA6BX9-yw-_rWeiUUN68N3hRkGIl_knvIWpj1pNLZZ2ZVWtROIkhyBmNlENmvbyy8uIBotVMEz-ao1TI_q6VZq9_o4bEWzudymCU3S-EFdVWk6Yvub7AEVsBtfcDtlY0",
      type: "comment",
    },
    {
      id: "4",
      name: "Chloe Bennett",
      message: "Started following you",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAfIKGNRsI9Sc6DBIXG8xkvqCAPxPsNKBviCDtnlbnH3rQZdeB5uXJKEOvByXlohZNdPQclynkhgqRg9FdSsJlxt2fFn16xsKJrX6ByUQywdwZ5N6jFDKddVawzm84zdkWO1aF4SuFQrrxx3Hr8zTi6tLpDbHiT8K7w62Jt_t1kD_BsY9whgTUMS8hjc5yvgxGqYBdS4ZE1pzDmf0uDh0m8BYdmmA2Uc8imo8e2DiDR-wZrPthBEYg9pOjWLhP9ee4wrwyxe45KktU",
      type: "follower",
    },
    {
      id: "5",
      name: "Lucas Reed",
      message: "Liked your post",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBFpRZE_LtK6XEqrQExyRYan8iPTnt-yfap2DE4XuMtBU_hG8vyoFZu0OFvWSak3ufhLEC4Gnvfq6U5m-t5OdYF85pRaXD5tr2pbfjUasDm_s8_1xeFfE7DSkK1vNi6HsfpQ9yAkjWwfwzyU4wY7g7MtKbg_Ot1NH7W22ROAQz605n7qzohDlIts6t-JWzLz_MZnCYVnW5UCpIi6ZJWSZdYUJnePWvO_Et7qvj1HIgccfUF5pRRv-LK6-pxVGea3gPOivsoYgov5WI",
      type: "like",
    },
    {
      id: "6",
      name: "Ava Thompson",
      message: "Commented on your post",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAWP4iQUNbVRUeOq42GlqD5CVuwNFxCrFBgZhMRx9TMuXCI4NnA8dWlt5p8AopOvlD0DPJYqv5D849SgInConoN3JU_xIXSPJUTfH9X3xegHnD--uHD90WAIkHBd74d79932rT_xs6H-_-CGsfMOTs9Y1BaoauFGo2kNy69fTLm0D_IlUUdE6dagliNbzZ9FFLl2iMJmmUdQO3q3j-C4OPCmNL3VN6LfeZwEnOTRVhh0yz816YeS-w8p_ArDC6FVQ1Ry1us6I21cgA",
      type: "comment",
    },
    {
      id: "7",
      name: "Noah Morgan",
      message: "Started following you",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBqiAiJQnnhUCN5fmDx45A8Gu3IFgctX-mnpXduB1KXKGpKhPdDFLaW_70QBbCc267QZt_O3X8CG3cplasVEvWFrSAJ_ZWELw41BgpL0QujjcHwNUYCmhkufiWtSb44l5bODlyAHhkXVQe8Rvf3ogGaQrlGWyzBWGkdUD4bSPz1i17MAOAfXqyQieybesEs7tOHzidKa77n_Jd_NjFOq-7c6Tuk2I-1YP4aOJQ5x1mJ-vXFzUivzrt0gHvT8vm_S6VTBP-r3sVKNdc",
      type: "follower",
    },
    {
      id: "8",
      name: "Sophia Clark",
      message: "Liked your post",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDtfGfGclu1HqiBmxvJOp-LlTuAoxMmmX9MMj9Khn8ivr64To8fFSybAT88CtcJn8u78pvmVcx7TDkB-M6LaU_AkB4k8TIvNM-O-nQ-iyE-5D_T5qtnyh5yM3VMhXKQ_6C8TnvF6WJyLjst6Jo38DdhXlaDKwEtjwDkoVP0_5RUFUHBmSlhuVDZf2-rMU9cALY-vlCaxoDU2OWXCjRWSZNWTUXhHMQTUOO_nVxl3g6vbfrubPe0p7Fwe18IeP4k06_zLqE24HwFiBw",
      type: "like",
    },
    {
      id: "9",
      name: "Liam Harper",
      message: "Commented on your post",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC98o0VkyMx9vOmVpkqojQRMxbqBmgf3RTrLai3MLggkUK-GqwZ9KMY233kM5wx6u4K0fu4FaeoYMzA-fOnNkhzxYUSWPMPkqFjJiJVjnssRz9eniZoRDtIxs7Mx6ChQ1jI1pewQ1oohwQ2HWzz13-cFDAbwTA0FOjtn_4nDm45cjji7wMTcGC1PjiIVW507YHV8kOnKrflL7ZnwL2K2KOU7KuPOpscfWih4CpOPvtxMMkYo7IMhky_9Ow7yZZ4nvepIwVM_gT4PA8",
      type: "comment",
    },
  ];

  const styles = StyleSheet.create({
    modal: {
      flex: 1,
      backgroundColor: backgroundColor,
    },
    bottomSpacer: {
      height: 20,
      backgroundColor: backgroundColor,
    },
  });

  const getFilteredNotifications = () => {
    switch (activeTab) {
      case "followers":
        return allNotifications.filter((item) => item.type === "follower");
      case "likes":
        return allNotifications.filter((item) => item.type === "like");
      default:
        return allNotifications;
    }
  };

  const handleMarkAllAsRead = () => {
    // Handle mark all as read functionality
    console.log("Mark all as read");
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: backgroundColor }}
      className="flex-1"
    >
      <Box style={styles.modal}>
        {/* Header */}
        <ModalHeader title="Notifications" onClose={() => router.back()} />

        {/* Tabs */}
        <NotificationTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Content */}
        <NotificationList notifications={getFilteredNotifications()} />

        {/* Bottom Actions */}
        <ActionButton
          title="Mark all as read"
          onPress={handleMarkAllAsRead}
          variant="primary"
        />

        <Box style={styles.bottomSpacer} />
      </Box>
    </SafeAreaView>
  );
};

export default NotificationModal;
