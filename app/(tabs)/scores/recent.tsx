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
import { SafeAreaView } from "../../../components/ui";

interface RecentMatchProps {
  title: string;
  result: string;
  imageUrl: string;
  date?: string;
  venue?: string;
}

const RecentMatch: React.FC<RecentMatchProps> = ({
  title,
  result,
  imageUrl,
  date,
  venue,
}) => {
  const backgroundColor = useThemeColor({}, "backgroundPrimary");
  const textColor = useThemeColor({}, "primaryText");
  const secondaryTextColor = useThemeColor({}, "secondaryText");

  return (
    <Box style={[styles.recentMatch, { backgroundColor }]}>
      <HStack style={styles.recentMatchContent}>
        <VStack style={styles.recentMatchInfo}>
          <Text style={[styles.recentMatchTitle, { color: textColor }]}>
            {title}
          </Text>
          <Text
            style={[styles.recentMatchResult, { color: secondaryTextColor }]}
          >
            {result}
          </Text>
          {date && (
            <Text
              style={[styles.recentMatchDate, { color: secondaryTextColor }]}
            >
              {date}
            </Text>
          )}
          {venue && (
            <Text
              style={[styles.recentMatchVenue, { color: secondaryTextColor }]}
            >
              {venue}
            </Text>
          )}
        </VStack>
        <Image
          source={{ uri: imageUrl }}
          style={styles.recentMatchImage}
          resizeMode="cover"
          alt={`${title} match image`}
        />
      </HStack>
    </Box>
  );
};

export default function RecentScreen() {
  const backgroundColor = useThemeColor({}, "backgroundSecondary");
  const textColor = useThemeColor({}, "primaryText");

  const recentMatches = [
    {
      title: "West Indies vs. Sri Lanka",
      result: "West Indies won by 6 wickets",
      date: "Yesterday",
      venue: "Kensington Oval, Barbados",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCNHEzzZ59-DSXbZWkieN7INLePwmxaQxioris4lfVv-bIzrz1h77yoPmap7bAQzjgQpd8e6-1GqO3r7pDzIAGLkXJ1zxEUhrAuCQeGIaQwDYclpEomBpkrHrIgH7RO2imezG8bF6kydXtbZxVRR4zt69Gg3vMslkQeS88xMRjDzIAcDJ6KL1h1TtRmrXOA7CSGtVILfsnfhIO1Vs8hNA7Tbantqfv1QqXThak22JA1frslHve1ir9aKW0c2gLdu5-bV-h56pAh4lU",
    },
    {
      title: "Australia vs. England",
      result: "Australia won by 8 wickets",
      date: "2 days ago",
      venue: "Melbourne Cricket Ground",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCZiriGZ7LnbbOHu4EhYAnDO4cB2HKG-jT8ALs65vkz1TRJnuP4Y7HQyoLcfQ_jtWVuPohBvBtFz3KRKO5WeCFoWNXIYGUodNtr-nsIQ5UNlT_Zxe_rpeliBcxltBdKt89wTQ7J0GCo2gFTuHbW9NYKFYtESqqs0c0w5BOlGUnAT9EIxHDLyWLW2GEu0gqTgcVpKu8x_bvC7wtsTNvymTobfFR2ekKKi7XFy4KKpElAcvwEyyMjJ4Qv_Ou7wtNnSe4PwqI6ueb9fOo",
    },
    {
      title: "India vs. Pakistan",
      result: "India won by 5 wickets",
      date: "3 days ago",
      venue: "Eden Gardens, Kolkata",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC-VyqDjvZpKC4GatEXB_KTpMczARO4hl6rXjpUBkiJoeAzMUoYvxGVC6OwHSd-Jqp_w72md4U71ccf_u913ERn8ibCrcZ1OCNtaotqQ9xXnisnbVbiAMIRXGEFe5gBCmwB3DpTd5t96_ILSkFwZeg8tjm6SD2QPL93f_lq6VdojuubwNGxtrr3sntT01TvJDyQ0ArSgFcxuFvI3U2OBitFcPyHHwHobcu08G9NIrR4s_gw_9PKaLt29s27POVZPChYpvAs5zsqrvo",
    },
    {
      title: "New Zealand vs. South Africa",
      result: "New Zealand won by 3 wickets",
      date: "4 days ago",
      venue: "Eden Park, Auckland",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDl3AlzwURSXSEwZrDHmLrPJk769YfhDUYh8ycR-dh-Nk7vXrpMSQSRJpg56utpmxGzGjYdoYzn2d2RFibmC4aTY99le9Sc-OSEE8ql3mOSDP5n64df8_kx28rZhbkgJEg7PfFI3Rn9jUrxWGIHODIevp1AapGVeYGVL1lUJ_m3ZTvIPtgdl2Qn8Lg3ZNC3Zf7Ri56_DZLrjzx10AlB6VLsmwAywRghI8CA23g0vFPp9c2aDu9FH44e_MkczBiEuNR_-PkCRSszgbY",
    },
    {
      title: "Bangladesh vs. Afghanistan",
      result: "Bangladesh won by 4 wickets",
      date: "5 days ago",
      venue: "Sher-e-Bangla Stadium, Dhaka",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCNHEzzZ59-DSXbZWkieN7INLePwmxaQxioris4lfVv-bIzrz1h77yoPmap7bAQzjgQpd8e6-1GqO3r7pDzIAGLkXJ1zxEUhrAuCQeGIaQwDYclpEomBpkrHrIgH7RO2imezG8bF6kydXtbZxVRR4zt69Gg3vMslkQeS88xMRjDzIAcDJ6KL1h1TtRmrXOA7CSGtVILfsnfhIO1Vs8hNA7Tbantqfv1QqXThak22JA1frslHve1ir9aKW0c2gLdu5-bV-h56pAh4lU",
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <Header title="Recent Results" isBack={true} isSearch={false} />
      <Box style={[styles.container, { backgroundColor }]}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Recent Matches List */}
          <Box style={styles.sectionContainer}>
            {recentMatches.map((match, index) => (
              <RecentMatch
                key={index}
                title={match.title}
                result={match.result}
                date={match.date}
                venue={match.venue}
                imageUrl={match.imageUrl}
              />
            ))}
          </Box>
        </ScrollView>
      </Box>
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
  recentMatch: {
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
  },
  recentMatchContent: {
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  recentMatchInfo: {
    flex: 1,
    gap: 4,
    justifyContent: "center",
  },
  recentMatchTitle: {
    fontSize: 16,
    fontFamily: Fonts.lexend.bold,
    lineHeight: 20,
  },
  recentMatchResult: {
    fontSize: 14,
    fontFamily: Fonts.lexend.regular,
    lineHeight: 18,
  },
  recentMatchDate: {
    fontSize: 12,
    fontFamily: Fonts.lexend.regular,
    lineHeight: 16,
  },
  recentMatchVenue: {
    fontSize: 12,
    fontFamily: Fonts.lexend.regular,
    lineHeight: 16,
  },
  recentMatchImage: {
    width: 80,
    height: 60,
    borderRadius: 8,
  },
});
