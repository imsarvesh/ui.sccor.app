import Header from "@/components/MainHeader";
import PostItem from "@/components/PostItem";
import RecordButton from "@/components/RecordButton";
import Sidebar from "@/components/Sidebar";
import StoriesList from "@/components/StoriesList";
import SuggestedUsers from "@/components/SuggestedUsers";
import Timeline, { TimelineRef } from "@/components/Timeline";
import { VStack } from "@/components/ui";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useRef, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "../../components/ui";

const HomePage = () => {
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

  const posts = [
    {
      id: 1,
      user: {
        name: "Ethan Walker",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBlXu1dn4IN38F65vzxPDTG45ftnXxhmNpkjdJSd_OjElyCTdFyyhW_7kQcpLe2XZ7i65VUOibkr1HQCeNPDGzo12L3p6Avszg41u81mA9sfV_Hhpb-dhUmVvpmADtfqwHakrC68RrwqZeuB3xNE_QnY_N7CgN1tE4LNX0Rhd8k6Nk_CSCHesEEt7zk--jMb2kgzw_1DrHGAuLUhagKHI0AlANGok4hxLgznmDTvS0FEEYsq2-KUUi7ygUIgEbSy-vkES97bEx2QDU",
        timeAgo: "1d",
      },
      content:
        "Just hit a new personal best in the 100m sprint! Feeling faster than ever. #trackandfield #sprint",
      likes: 23,
      comments: 5,
      type: "text",
    },
    {
      id: 2,
      user: {
        name: "Olivia Hayes",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBV_yB4ZmW1kJiCl9wI_uyab-0c7qze_ODBRoe-kL6I4CcXmtWjbVP7aKb678vEyO89mkdKK27oB7GFSzsn8xDkA0AbfmW1KCaIP5hGs2o-2sD1vwSA9yeC12Dz9wUlFoz7EMpvvPHauPgBQ7TgS9bRp2x_szgCBQNlqvR-P7HosDwX6T11wMZUooHC-5bqroPGjeZJY8AOrimuJd1OniKhI8mzWRlb-Qd9_ET5w88VvlYm-EV2s2DAUbqLAvjxQ0WWR8Y5Trill30",
        timeAgo: "2d",
      },
      content:
        "Nailed my first marathon! The support from the crowd was incredible. #marathon #running",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC0drkq_gDLrwqdcGSUpHg6ENjtMvvWA-rp_eE0WFQ2fI_4vdLRJ06-EpDc_RWSpIllGllWgOc1NoixBJQISEI7FlxFtpP_M4-S27_5C7-K2_5-8YsXWyoM5toCXCYYmMw03_KGUYw08lE7skfxtJe_IZTjGl3FkuanePWKB_fTZhDVcQFR8mm7n5lvzXLdOHFK477wpkk_Jb2AnAyjMYlSYPz5xqCs5NuH3PhTZsl-7u22-7ulP-LFtpAG-EGQ99bngJ6hPqRm_v0",
      likes: 45,
      comments: 12,
      type: "image",
    },
    {
      id: 3,
      user: {
        name: "Noah Bennett",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuB-IHr2yciveVaoY3ZDAwEVAU7ZbuGwWSeGlrD4QGbaKNR2ZE71OQKbUybC2YWtx5ddeUm6kF232JDhOffmRgs13fndLy6_MTPnZ-X9NeDrI5-FlN_0wXU1jVQoflBw40igZaSXcL-4TkLEr_qdWIeq8BsnLhKwACER0HMkNcG5i0q7z6SzQHASG5wAapI6OrZjB4UUCm6gOkJ01kRRkr6kfis_tOBL1nPVsAG-kL7dHkrFQ4rZob_T6CSdW5STZeEvjcg7K5JJDjo",
        timeAgo: "3d",
      },
      content:
        "Finally mastered the backflip on my snowboard! Years of practice paid off. #snowboarding #backflip",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD9OUP9HBs8xUHMugiijvkqJuqftugEeKSQOmQRxwDiPKtUZT2YCAzx3o2grK_8mEErSqn5dAA_JfrfVMGRcmFDNU2y-M0dWjcr9sIHVY95SFbi55jaCJsI9B5X5TtA1zA2FL-zJ2mX9bKISY3Y02HvtC-ZXqFh2TYeOgEkaZdmmERmA51oyWh3ivDkNvD-W8e6JeedCBjpWJ8vZ6R2aQvxgEocsqH69UaadOZKVqAALfvPykZ2D6sulYlxf6eYKfmlpCSKD6LqIaY",
      likes: 38,
      comments: 8,
      type: "image",
    },
    {
      id: 4,
      user: {
        name: "Sophia Mitchell",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCWJTGXfx2wMZaTH4YjKaFXUnCIfh6qJP5gc4wqUlt0FRmMnqAOqyIneXzobDcWOa21UWjxTRUibhOhknZNI68z8lERSdcUt-evstg7ENGlLhklV9CFVaA_nfbtuKtBck5qwqqmajqCwjSRqmJO59UZ8h4TSfgCXHOYC3RSV4GxWu0rpOUx1mUkzpRulWNJzkHNcJI-_vR5Y5EdITBcnsnfCrmdQbUxJcOPmIzPcQm8mTjevcMnBYq8X8Oj4p7EksJi3Z1TmYhLGSY",
        timeAgo: "1d",
      },
      content:
        "Just won my tennis match against Amelia Carter! The final score was 6-4, 7-5. Tap on a player's name to view their profile. #tennis #match",
      scoreboard: {
        player1: { name: "Sophia Mitchell", scores: [6, 7] },
        player2: { name: "Amelia Carter", scores: [4, 5] },
      },
      likes: 15,
      comments: 3,
      type: "scoreboard",
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

        {/* Posts */}
        <VStack style={styles.postsContainer}>
          <Timeline ref={timelineRef} />

          {posts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
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
