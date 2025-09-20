import Header from "@/components/Header";
import { ThemedText } from "@/components/ThemedText";
import TrendingTopics from "@/components/TrendingTopics";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { Image, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExploreScreen() {
  const colorScheme = useColorScheme();

  const primaryText = useThemeColor({}, "primaryText");
  const secondaryText = useThemeColor({}, "secondaryText");
  const backgroundPrimary = useThemeColor({}, "backgroundPrimary");

  const trendingActivities = [
    {
      id: 1,
      title: "Morning Run",
      participants: "1000+ participants",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC7tkXagIAOXzNtgYLyx3zJCJnNcKZLDHWE0yZ3W9aa73PbcmqKDEF6s_8EtMNumLSzJVmICMiwFm41BZknPKH7y9AJwbWXXJvxqPd5DiW1iZlIrISymM-1rCBgpDa4hEWY6e3_9YKum_qHL_BShQKb04Z0lVYYAkolw102vCmxbEdYea4ZFGoUslzmxyuQKt6hR1BIT0BT07j6x3OjoM8p5fAjU2IwtQUkyQ4glLXW4EBFlFhKcTbshJAUcmOXjscX21TFT6VCAmI",
    },
    {
      id: 2,
      title: "Bike Ride",
      participants: "800+ participants",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCM1dOeTGyPElIoU9ni_ON6uCq57yfpMHCCNd8Vnf6bWLF3idcPtHXns4ZVpf8rtkGLUspRRfkM4p4FId263fHn06UzPhTdj1IWF1R2D2X5Ma3366P_2535rPDx2afH3vxNjRxsk1BiIQZ4XyTQzEkRI2uxbrfPnuWaq8l8Xspn3d0kGgHwhdCspRZrhLeXRL1a_k1lVrQTAhFH1ETP6HAWMtYt3UyYUcKLkCrr8ewH6WJBvfjFn4j8SDvmwHgjDq9SvPdpK6LXw2g",
    },
    {
      id: 3,
      title: "Pool Workout",
      participants: "600+ participants",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB8uExqcqLHlCIsHBPoxSsYNruoNM9p9kGZHdh84p3CFW5LguCYBaGt716q1hFLYJmNg4rMEanbItebsvhdFvv3D2mKcuY5voAGr0WvQjmGroyA4IYIfpbleFrtZ7s1_PZUnECaCHr_Pzb8oUfj20ElWzycnBbVkKGl5dmAB8iOWZEpRXDtW6D-mcPWreMhRVm9tVM4sYg4XRsPooRuD90rgeawOAm1Nm5NAvfiT2Yg-gLeAilSb3mf9PyRiyIO1md-ipprExfAOOY",
    },
    {
      id: 4,
      title: "Gym Session",
      participants: "500+ participants",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCxXGCXnhBYPpyApf3VYfdcuDXU2BL2SsJTflgWY95roiPV4C7Xdgq1mCw8SfW4zUMTra3GV7AI0RKcjvG97sARY7Dl7W9JXuIeD-qUsqY4Pr__YiYnLbWqPnP_kb7qH_W-knrhG4bQ2iVh6yoRnmNVmXlOWlNuOgKl8sWeXSIQK2hUxEyTQTUhVgeaRSyvmKH2ayTtJYR6Uju6zejnzr6kiQJCeG0GeWALDqQ_RXyhHJy9UWaPD_pDg8O68m4RMwdH-dd2sFbrIBw",
    },
  ];

  const popularAthletes = [
    {
      id: 1,
      name: "Sarah J.",
      sport: "Runner",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAACJ09JfEWhi-3cQAecVqLfQzMJkIHHC_OaVz-DLot-XFqKI5ctLyhg26UzTXpluVuCkbNnMX65ATjJGaNZVPRjZZtmf_l13y_Irs-nZNR-1OUxhRWg8XkxWUQ4KjisZYIrT3wJEWaYppfbg7aeyNene1Rx1rh9ERfokbmvBFNWJ6wHTYXwidWWFewRNknYQwGMCRlK6Cxd72E9vI98UbzikwaqlmT2p0RwvQSks42CaXnZSTyyArYuH7cRsPWeCvZCQZkJaR8cxs",
    },
    {
      id: 2,
      name: "Mark T.",
      sport: "Cyclist",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCP78e3wBvmlUmo5X_RNvXpy9blORwbX-7wCR9XfEfXuumM-YAs8qGuRZ4wsBTwM1M3AVRePuaLoqIk9ENWYwr1jbx90w7Lhij8gkqbFQGoaq9uZaHWOwE_kbifPrcaEUfFcpCAbDapqiRSn7sKB30e_38VvH4DbQdOg4s57A7xirCAORG7xubp3Q6o1yCQYsNj_JTIGB5Hr_EavbP1-Choi65r3uvrLe_T5z3GltsDQrMF1rYrMU4WapnwH4-AP2tsMIxTXMl_ulo",
    },
    {
      id: 3,
      name: "Emily L.",
      sport: "Swimmer",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD_yFST52JwXPCaZgGVGiQarcU4w9CDmvM0zTl9wKyTcSDlrNBR1bHVyRmVeXf8VOy6NhiQn1la3nQkBze-hGG0Mu9FeFJzwPEHWO6PGAoRcQcYFVjrxAhgra3UKnn75KdWPIh6oqCpsYwFmNRwxQL3I3F_Pq4OLBaoHGpjlmvXYtdZBENrPS5HPWL85VQCuGU3P3ELT61ADWdqSVDi59HZMD0CZVsNpKaYyfMaX7Ozfa06cY2RXsoqk5m2y8l3RfCyaDxyRrRDGQc",
    },
    {
      id: 4,
      name: "David K.",
      sport: "Weightlifter",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAgc_OEJTnThm44Ro2zGdG3FgrA16DS-igDQTwxD6ZjzRLIP3i2i-EmWDYheGdSpZsT6ZR1imE1tvoAGo_vTudT-h3xBDNYrwBu7GqoKUTp2D3DaF0FOKRPEx5Mk9l0BvW5lnqdVEC7m6T-92FGklYLCI3OFSq5wI0d3hS9gO5J5ZRk9IndwoJn-nrRcyPpHhIy5qtp9AHD2dEbKHPYtmfrj_p0GoanAN-Xc5b03CrZVQwbe_8ajEiLdPSietafGvESaW79Ml--xZ4",
    },
  ];

  const recommendedGroups = [
    {
      id: 1,
      name: "Runners United",
      members: "1500+ members",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCvdzSHOZ-cAyMVKeS2SNp1_9PFWSlEfNZymwZqzcSRqgkZ8xnJp83iOV95HYK5zadlkNh1XoHK9W8Vfhzmcllvn3WgYGrNvcnT6mb7umrFDMVqEka-Cmxkh7j_MBr1Oim6ImvL-PrL32Hy9fjqPkE60pcPLL4KcI9wKZR4nRyNHGmYaZEYMM7jVuOF0YCDPAIqqAzOsxnUW4oYWK-ehSFBg8Pas8TOUf03qleW_XFcerIrPD139UNtP7wz-ncOf2YmfjeQBp5KGG0",
    },
    {
      id: 2,
      name: "Cycle Squad",
      members: "1200+ members",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCO1U6pUD0L1gvqWDgcmaUOYApFePJDHPI6JckbCNbmLG4m4nvEjRagIZBA4I3gt8uyUQAm-dfAYYfySBcSkZqhWOcZw_4iGyHCTWtiEqmhMdyO_RJZbmw9-QClA3IssoBjmqZCnDoSFViKpASJWnYDKx4YQetL7-Z_v9Y8ZgDYNTYonJHuDAE5-HcEqV5cFy1FL5XEfvGrWBWfNsbLGfeKoxCxQI6vgY9S54U8cLsOrhxpT2W6toyEHN8EMNBV9YE72pbBLlaUnPI",
    },
    {
      id: 3,
      name: "Swim Team",
      members: "900+ members",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBtNWfnqPVTIAxRZ18kPrnMx7isBDnX5TWWnYOFO708nJOXYKk-K5Nq-vQcT_j9Wl4wKK7V7jfAjl4XmZAwGkQUTLCoV9l5jXlsHqOkxw7jiJear0Rhsh5dOYXXhcLIfoU-9FaEEkN8imKnumlMufELVXFFfvFdWg-GnKvqZlCdcKb53oJgPH-xS6EmYadFctYaDAWbXxTF4UE_yELgkQxGJ4s8-ebeKARgIOm8d-Z15mmAXQg_hTjDqz0uKnL3wxVynSpiJ9xluBw",
    },
    {
      id: 4,
      name: "Lift Heavy",
      members: "700+ members",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBGarr9VZQcQzuzqD_VGQDaQFaPiygyuMWqTdTM1peWcO0884g5xnJfxcsrHDcBiUaV4lqPI3cWqH0-wh3qtJP2Sjz4-J2K4LDSup6Gph71HBL1hbb0smR9tBLyDAxthxFPEQYM_5kk7dwz2a2_dTQcImXKx4E88F5XeIfbmRp2V98BK8fe6ozCKCt0P4VQrM6Z7JM4r6X1CvNQwusAp181LWw-UX3gS9Cq_wqh4IhHQyrgbQn3UIxFjUvZSYqBVXYIb34peRMzrmo",
    },
  ];

  const featuredContent = [
    {
      id: 1,
      type: "Article",
      title: "The Science of Endurance",
      description:
        "Learn how to push your limits and achieve peak performance.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCxKbNh89payT--UR4VHewaFg61Buh0Ihxr8L0CZr8K_WSQHc7cSC4SdmxdNgAXoAjpU__fJdDzVTp8c4tSTXv-Fg9jgSphZYzAqpupsMeTldZXZ2XGjDwrjjCYBXVzspqd2RODShMqpqXgNjmQ0TF0lqB7bUEeCm5J-MfSa1roM0QtxTk68N8d0wNzCcLXnDJ5nmkLnEuEUawOVE_mxeNhb6FER5r_eBRrcSKckn8OZm-nP98gZVM1hZxCMjVRjN0DGASD5qG7tCU",
    },
    {
      id: 2,
      type: "Video",
      title: "Mastering Your Form",
      description:
        "Expert tips to improve your technique and prevent injuries.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB4A6eejw0G23Ni0UtFcbJD9_pRaH0TREBm_dPI-bVQIJ_ofzknCMJcCeEZOTqNUW8hEZfdippJe_roq0gL-MG9Zdbpov_zEN34-YdiO-n9N0-JSVwBTt0zeAZNXF7lT3YihCSNbUoYfNmCtMg_8wtVDlxPPUZL7wU90pa4Kl7yJrFUCHRsaRXdOvqfY-KuvBe81aghaCIMBbW0Nc7pZte3GWT2Qyvc2KkpowC7SACeDps1sqcBuyoEYnaqZe2tu6mhQ2FiOP3jlnY",
    },
  ];

  const trendingTopics = [
    "#NBAPlayoffs",
    "#NFLDraft",
    "#MLBOpeningDay",
    "#SoccerNews",
    "#TennisUpdates",
  ];

  return (
    <SafeAreaView
      style={{ backgroundColor: backgroundPrimary }}
      className="flex-1"
    >
      <View className="flex-1">
        {/* Header */}
        <Header title="Explore" />

        <TrendingTopics topics={trendingTopics} />

        <ScrollView className="flex-1">
          {/* Trending Activities */}
          <ThemedText className="text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
            Trending activities
          </ThemedText>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-4"
          >
            <View className="flex-row gap-3">
              {trendingActivities.map((activity) => (
                <View key={activity.id} className="flex-1 min-w-40 gap-4">
                  <Image
                    source={{ uri: activity.image }}
                    className="w-full aspect-square rounded-xl"
                    resizeMode="cover"
                  />
                  <View>
                    <ThemedText
                      style={{ color: primaryText }}
                      className="text-base font-medium leading-normal"
                    >
                      {activity.title}
                    </ThemedText>
                    <ThemedText
                      style={{ color: secondaryText }}
                      className="text-sm font-normal leading-normal"
                    >
                      {activity.participants}
                    </ThemedText>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* Popular Athletes */}
          <ThemedText className="text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
            Popular athletes
          </ThemedText>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-4"
          >
            <View className="flex-row gap-8">
              {popularAthletes.map((athlete) => (
                <View
                  key={athlete.id}
                  className="flex-1 min-w-32 items-center gap-4 pt-4"
                >
                  <Image
                    source={{ uri: athlete.image }}
                    className="w-full aspect-square rounded-full"
                    resizeMode="cover"
                  />
                  <View className="items-center">
                    <ThemedText
                      style={{ color: primaryText }}
                      className="text-base font-medium leading-normal"
                    >
                      {athlete.name}
                    </ThemedText>
                    <ThemedText
                      style={{ color: secondaryText }}
                      className="text-sm font-normal leading-normal"
                    >
                      {athlete.sport}
                    </ThemedText>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* Recommended Groups */}
          <ThemedText className="text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
            Recommended groups
          </ThemedText>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-4"
          >
            <View className="flex-row gap-3">
              {recommendedGroups.map((group) => (
                <View key={group.id} className="flex-1 min-w-40 gap-4">
                  <Image
                    source={{ uri: group.image }}
                    className="w-full aspect-square rounded-xl"
                    resizeMode="cover"
                  />
                  <View>
                    <ThemedText
                      style={{ color: primaryText }}
                      className="text-base font-medium leading-normal"
                    >
                      {group.name}
                    </ThemedText>
                    <ThemedText
                      style={{ color: secondaryText }}
                      className="text-sm font-normal leading-normal"
                    >
                      {group.members}
                    </ThemedText>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* Featured Content */}
          <ThemedText className="text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
            Featured content
          </ThemedText>
          {featuredContent.map((content) => (
            <View key={content.id} className="p-4">
              <View className="flex-row items-stretch justify-between gap-4 rounded-xl">
                <View className="flex-col gap-1 flex-2">
                  <ThemedText
                    style={{ color: secondaryText }}
                    className="text-sm font-normal leading-normal"
                  >
                    {content.type}
                  </ThemedText>
                  <ThemedText
                    style={{ color: primaryText }}
                    className="text-base font-medium leading-normal"
                  >
                    {content.title}
                  </ThemedText>
                  <ThemedText
                    style={{ color: secondaryText }}
                    className="text-sm font-normal leading-normal"
                  >
                    {content.description}
                  </ThemedText>
                </View>
                <Image
                  source={{ uri: content.image }}
                  className="w-full aspect-video rounded-xl flex-1"
                  resizeMode="cover"
                />
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
