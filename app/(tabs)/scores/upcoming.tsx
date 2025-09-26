import { Header } from "@/components";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Fonts } from "@/constants/Fonts";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "@/components/ui";

interface UpcomingMatchProps {
  title: string;
  time: string;
  imageUrl: string;
  venue?: string;
}

const UpcomingMatch: React.FC<UpcomingMatchProps> = ({
  title,
  time,
  imageUrl,
  venue,
}) => {
  const backgroundColor = useThemeColor({}, "backgroundPrimary");
  const textColor = useThemeColor({}, "primaryText");
  const secondaryTextColor = useThemeColor({}, "secondaryText");

  return (
    <Box style={[styles.upcomingMatch, { backgroundColor }]}>
      <HStack style={styles.upcomingMatchContent}>
        <VStack style={styles.upcomingMatchInfo}>
          <Text style={[styles.upcomingMatchTitle, { color: textColor }]}>
            {title}
          </Text>
          <Text
            style={[styles.upcomingMatchTime, { color: secondaryTextColor }]}
          >
            {time}
          </Text>
          {venue && (
            <Text
              style={[styles.upcomingMatchVenue, { color: secondaryTextColor }]}
            >
              {venue}
            </Text>
          )}
        </VStack>
        <Image
          source={{ uri: imageUrl }}
          style={styles.upcomingMatchImage}
          resizeMode="cover"
          alt={`${title} match image`}
        />
      </HStack>
    </Box>
  );
};

export default function UpcomingScreen() {
  const backgroundColor = useThemeColor({}, "backgroundSecondary");

  const upcomingMatches = [
    {
      title: "England vs. South Africa",
      time: "Tomorrow, 10:00 AM",
      venue: "Lord's Cricket Ground, London",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC-VyqDjvZpKC4GatEXB_KTpMczARO4hl6rXjpUBkiJoeAzMUoYvxGVC6OwHSd-Jqp_w72md4U71ccf_u913ERn8ibCrcZ1OCNtaotqQ9xXnisnbVbiAMIRXGEFe5gBCmwB3DpTd5t96_ILSkFwZeg8tjm6SD2QPL93f_lq6VdojuubwNGxtrr3sntT01TvJDyQ0ArSgFcxuFvI3U2OBitFcPyHHwHobcu08G9NIrR4s_gw_9PKaLt29s27POVZPChYpvAs5zsqrvo",
    },
    {
      title: "New Zealand vs. Pakistan",
      time: "Next Week, 2:00 PM",
      venue: "Eden Park, Auckland",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDl3AlzwURSXSEwZrDHmLrPJk769YfhDUYh8ycR-dh-Nk7vXrpMSQSRJpg56utpmxGzGjYdoYzn2d2RFibmC4aTY99le9Sc-OSEE8ql3mOSDP5n64df8_kx28rZhbkgJEg7PfFI3Rn9jUrxWGIHODIevp1AapGVeYGVL1lUJ_m3ZTvIPtgdl2Qn8Lg3ZNC3Zf7Ri56_DZLrjzx10AlB6VLsmwAywRghI8CA23g0vFPp9c2aDu9FH44e_MkczBiEuNR_-PkCRSszgbY",
    },
    {
      title: "Australia vs. India",
      time: "Next Week, 7:30 PM",
      venue: "Melbourne Cricket Ground",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCZiriGZ7LnbbOHu4EhYAnDO4cB2HKG-jT8ALs65vkz1TRJnuP4Y7HQyoLcfQ_jtWVuPohBvBtFz3KRKO5WeCFoWNXIYGUodNtr-nsIQ5UNlT_Zxe_rpeliBcxltBdKt89wTQ7J0GCo2gFTuHbW9NYKFYtESqqs0c0w5BOlGUnAT9EIxHDLyWLW2GEu0gqTgcVpKu8x_bvC7wtsTNvymTobfFR2ekKKi7XFy4KKpElAcvwEyyMjJ4Qv_Ou7wtNnSe4PwqI6ueb9fOo",
    },
    {
      title: "West Indies vs. Bangladesh",
      time: "Next Week, 11:00 AM",
      venue: "Kensington Oval, Barbados",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCNHEzzZ59-DSXbZWkieN7INLePwmxaQxioris4lfVv-bIzrz1h77yoPmap7bAQzjgQpd8e6-1GqO3r7pDzIAGLkXJ1zxEUhrAuCQeGIaQwDYclpEomBpkrHrIgH7RO2imezG8bF6kydXtbZxVRR4zt69Gg3vMslkQeS88xMRjDzIAcDJ6KL1h1TtRmrXOA7CSGtVILfsnfhIO1Vs8hNA7Tbantqfv1QqXThak22JA1frslHve1ir9aKW0c2gLdu5-bV-h56pAh4lU",
    },
    {
      title: "Sri Lanka vs. Afghanistan",
      time: "Next Week, 3:30 PM",
      venue: "R. Premadasa Stadium, Colombo",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC-VyqDjvZpKC4GatEXB_KTpMczARO4hl6rXjpUBkiJoeAzMUoYvxGVC6OwHSd-Jqp_w72md4U71ccf_u913ERn8ibCrcZ1OCNtaotqQ9xXnisnbVbiAMIRXGEFe5gBCmwB3DpTd5t96_ILSkFwZeg8tjm6SD2QPL93f_lq6VdojuubwNGxtrr3sntT01TvJDyQ0ArSgFcxuFvI3U2OBitFcPyHHwHobcu08G9NIrR4s_gw_9PKaLt29s27POVZPChYpvAs5zsqrvo",
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      {/* Header */}
      <Header title="Upcoming" isBack={true} isSearch={false} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Upcoming Matches List */}
        <Box style={styles.sectionContainer}>
          {upcomingMatches.map((match, index) => (
            <UpcomingMatch
              key={index}
              title={match.title}
              time={match.time}
              venue={match.venue}
              imageUrl={match.imageUrl}
            />
          ))}
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: "center",
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
    textAlign: "center",
    fontSize: 18,
    fontFamily: Fonts.lexend.bold,
    marginRight: 48,
  },
  headerSpacer: {
    width: 48,
  },
  sectionContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  upcomingMatch: {
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
  },
  upcomingMatchContent: {
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  upcomingMatchInfo: {
    flex: 1,
    gap: 4,
    justifyContent: "center",
  },
  upcomingMatchTitle: {
    fontSize: 16,
    fontFamily: Fonts.lexend.bold,
    lineHeight: 20,
  },
  upcomingMatchTime: {
    fontSize: 14,
    fontFamily: Fonts.lexend.regular,
    lineHeight: 18,
  },
  upcomingMatchVenue: {
    fontSize: 12,
    fontFamily: Fonts.lexend.regular,
    lineHeight: 16,
  },
  upcomingMatchImage: {
    width: 80,
    height: 60,
    borderRadius: 8,
  },
});
