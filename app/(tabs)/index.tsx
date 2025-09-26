import Header from "@/components/MainHeader";
import RecordButton from "@/components/RecordButton";
import Sidebar from "@/components/Sidebar";
import StoriesList from "@/components/StoriesList";
import SuggestedUsers from "@/components/SuggestedUsers";
import MyTimeline, { TimelineRef } from "@/components/MyTimeline";
import { VStack } from "@/components/ui";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useRef, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { SafeAreaView } from "@/components/ui";
import Timeline from "@/components/Timeline";
import { useStore } from "@/providers";

const HomePage = () => {
  const { isLoggedIn } = useStore();
  const colorScheme = useColorScheme();
  const timelineRef = useRef<TimelineRef>(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    Promise.all([timelineRef.current.reload()]).then(() => {
      setRefreshing(false);
    });
  }, []);
  const textColor = useThemeColor({}, "text");

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  // Theme-aware colors
  const backgroundColor = useThemeColor({}, "background");

  const stories = [
    {
      id: 1,
      name: "Ethan",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAPQG8ZqSZS7Y0Ql-mYYZaWfYSQ25Dqx9w_hNeZHwysIlZ8OXDvBWujKKWSR6yzTWZPQ1SSA9I9gW7_s_mjOwJQBwSHQb7AKSquoCVgWpQi9YX7y2HpxlDiFvohFjhCVoFTxIS-ICBw-SP-dGW-qnZmWSkKComob6rUNteI4lYEMp9j0hqcYtTMZ_KYnBx2oyOOJF2X7eAywAMqtlZqDE-nEaAoOGf2VTXlXB1flbxWEY7RwigxPmHBash322Ugh4ISHo4Lw2QWogc",
    },
    {
      id: 2,
      name: "Isabella",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAuKvdN2KuucfZIHX-sHVS29hJj4_YaroSH3TlbDOo7yz2vgc3IQSDNr9TOWCKaaX3nU0kIlNKQW_HU9H09CaRim8NesTN1LyXR8WaZ7WxFz05YgL98FYB0wg_KUc9lqtOC3Xd12rXea6yrhApYeUVIviLLQPmsXZhL0ygCUH8nUZODpkYmTHwrFwSEWDECHgG4FL-x3lv_J_fZY6oT3LjkfX_SsUcIN9w7Cydbi8dqpRqy8_XXXKWJXkIFYrg0m-06fJ3yl1eVbFM",
    },
    {
      id: 3,
      name: "Caleb",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCXBJCa04UQiPXMsxyimgpll4kPGXU8bE9HaB1_Xz4JNT6LdWgtOEokfCMMJXbeiIvpd5Wd6I-vAO8jRKQ_THbxEFUDsgwNeGDWCQgQ9HzpsfLAleYiJtozRpf03Am2jwt2fd6BRrYPl9Kc6Zs-3pp83a3Oo7uIROQ9QllZnAH3xo2cXDqzKvqNGpi3BzgeKFxqtNrFrab4ogqYx5uDqXEXfmCnWrIosT51A2uT9jzX7b2jzsaPAaPDAHcZ3qyBGOEWxh91kBpovhg",
    },
    {
      id: 4,
      name: "Sophia",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAmTH8_v6a9ylVm6MY-n3ZF3HCFLW5SVygf2xfF2P1v1bFTNcB71T9olDcgvqi4vPouOJEx9wtsrYwzn1W1OqL79xB5Kt8WGr2hf4_EbRqEXRkt_cy8syn_gW6p15mhTl88PHW1p135h0Rym2MbV5vpNpMDA-fiQtSkf-LkGEdwRqfWUUWKlGBzwkUZ-SmwZZk2ukxOFsVFeJ5qy1taj2eKTA9nDMLR1ptoASNDDP6eCs6-YH5QBrkyeHSB0Tv4oP0soplioPRYYRY",
    },
    {
      id: 5,
      name: "Lucas",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDCI4-ywtgq9gRo9jZ9FcBCyfu1vij2KP2wu8sCnRWhI7jeE9fVooKxTGul6c_VEVTmVQcv2D0vw3Jym1V0t45z-48sb-pMlRDR0vmqPZMkOEqYAZPHOYyyoT4DNznQckjnDmaf6BofGxJHQ-x5T61cDQLP8qldYY_XXcZbdh0mmXH64Jz5sMj32w0HbRNqZFjB5TdlsQpVBW-LJzT5rAuPU92ILNTNrXJYIvqCYuI5pQZ0Si6oN8QGEaAlUfLwEJcEo87RjsYDK1U",
    },
  ];

  const suggestedUsers: any[] = [
    {
      id: "1",
      name: "Owen Mitchell",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBQcLaAzQQ1tdUJLTeXMGPLsx4DRcAdWjoVT0lT2eJF1LOSUwCz1Kl_rs-FgeNkpp85w4Fcjc0pGQsyZT9fqCakKvL75vFMyCUdVZlBAnsYVmj29Wk5skatJmSqGZ5N9C_URe3WHUaejxfhT2xBTQ2C--E7SD1uRgwTitDqs7tHMJBfS1JSLbj6FuCg5c_YeLkEoJ4jw8aSglEJXFL013ikyAx87fqa8bT9xvqp6_cYSFBkkXj6qVfdQ5bhzxHwXd3wFSChYsEDeU99",
    },
    {
      id: "2",
      name: "Chloe Bennett",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCEIphUijV5vfKJpCpJbW7O26lnvvZWRc5lyL5tqiD4eUTWqH8EAGJ7HCg8POnC__49MwVAOqdvRoFi6b_uRFhv0EPokSWEGUeHjo7c8yD7gWJE95fISh6krCW5tNVk9rqn_x2DAoTLCvtuLscqeMbIo3xos9HcEzhNvjvuk0Fq80OXSn4-qPwFEpj5F-b03goRcWr7kxQZOWWdQlaRkSyYg_Pc5_adQ6LGfuSfSoD_hRCBvyaDH3qxxYnOv4PeJ6toLzSeCaw0-j1n",
    },
    {
      id: "3",
      name: "Lucas Reed",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDWPIZcNlcVjAGvnFgfIbgIhFqtU8k_Jl5P8nIXUBmMcvr253MVZCxyxLkkBmtjdqwjG2U-nmnthVcP6zjgMHLBI9UNWqus9LjSEQ96meaW9ofS2GiQSa1fGYuqh__SUo20_S-AhK9BlCrivo6tUrOBlW1BhmcA4ZMx0SxQExwutzG0UJ458Yg0uiP0QCE2T0_08Dda4sciMGLEtxSKEFot_WTghbkqMJyx7Tn_u5NpBrScFcg8Ousa8rzA7y_LJqHAcnO-36wGf_UO",
    },
    {
      id: "4",
      name: "Mia Collins",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCPJ0buB9WKEsoBhub-gk-gLweYtZgZYFPYclyjs2yFWXr9_pNKBaEMRCLMXwIqtUvUbMI39PCEaDxQiengVyxPEbqJWotCKDU0epY_8qLO0uhwJJBujg4DfrEAnuhO8m57DnLuj0YV8yX7I4860E_a14eIRNH9zQnQ7nJAY5Trmu0XhmH4Zn8ThnOOYGbZiUmU-QGbGcbPA6dLnSFiJTp5ye4BUXP5gcUDpF83N4_CQGSOIFdmCUYu79amNvbs0NHsp80zFljUox9k",
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: backgroundColor,
    },
    scrollView: {
      flex: 1,
    },
    postsContainer: {
      paddingHorizontal: 16,
      paddingTop: 8,
    },
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />

      {/* Header */}
      <Header onMenuPress={() => setIsSidebarVisible(true)} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Stories */}
        <StoriesList stories={stories} />

        {/* Record Activity Button */}
        <RecordButton onPress={() => router.push("/activity")} />

        <SuggestedUsers users={suggestedUsers} />

        <TouchableOpacity onPress={() => router.push("/profile/1745603081698")}>
          <Text style={{ color: textColor }}>Gmail User</Text>
        </TouchableOpacity>

        {/* Posts */}
        <VStack style={styles.postsContainer}>
          {isLoggedIn ? (
            <MyTimeline ref={timelineRef} />
          ) : (
            <Timeline ref={timelineRef} />
          )}
        </VStack>
      </ScrollView>

      {/* Sidebar */}
      <Sidebar
        visible={isSidebarVisible}
        onClose={() => setIsSidebarVisible(false)}
      />
    </SafeAreaView>
  );
};

export default HomePage;
