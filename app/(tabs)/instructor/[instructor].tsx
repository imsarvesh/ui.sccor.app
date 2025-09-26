import { Header } from "@/components";
import { Icon } from "@/components/ui";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "@/components/ui";

interface Credential {
  id: string;
  title: string;
}

interface SuccessStory {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

interface Testimonial {
  id: string;
  name: string;
  timeAgo: string;
  rating: number;
  comment: string;
  likes: number;
  avatarUrl: string;
}

const credentials: Credential[] = [
  { id: "1", title: "Certified Personal Trainer" },
  { id: "2", title: "Yoga Instructor Certification" },
  { id: "3", title: "HIIT Specialist" },
];

const successStories: SuccessStory[] = [
  {
    id: "1",
    title: "Sarah's Journey",
    description: "Lost 20 lbs and improved strength",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDc_Dwlu4WRTtDXb95em7GEPw7bsdJbJrdWGhObMtyYDr9H0xOdFfBvHjS8mjt_sDtdq7mMdjc1G0XSJuG67F3VqlaPPtfBlEVSlBei9dofuuHxJ_I9Wky1kNfRDoZzme2l0f-0jzlY67Y3uKuFOpeYkV__ggBcheoLkeypSBtGmBe5Qs3uq9HshETDtMOGtXEPqWGeH7gE6-sXs0z7qCxQ0bWqGgcF5MrIBU4IBiYsUsg8Zkm26o3_IGEY-m2cL2Jz9WBiVkdy5Co",
  },
  {
    id: "2",
    title: "Mark's Transformation",
    description: "Gained muscle and increased endurance",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB24agz_vBSOZf-3Uucj_wxXajV79NbvuAuEVNrvASNbHOekbYvv-8a6oltpudfFtIq41fzYBEbgHWkmBp5n_RimvluV9QQ_KwYSpfNRNFtuBueirtyZ5Sc27CaOgrh9LN1upqTY21p5upcE2VDKDQJpIjdBkwi2IIM_KnRO2N8p1mY0de0deHuS-EaWoIDj-AeuThCq4u1cyCiyX_bMts7ziiBm3pf9xAwXczdAqVgV7upEM8tEUPLwiut48m88LABIGyjun-YKJc",
  },
  {
    id: "3",
    title: "Emily's Progress",
    description: "Achieved fitness goals and improved health",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC9tycSZ86Ml0YVPCl9fwgNtCy0zPmvWQAYuLsYyEKH977gFm3WO2kdWl87EBxVLj5O-h13f8jjIPa_o7whfDY9i-W712tIHIKYmdMZtVvs7A7_E42X0vPZogC-jHdCLAYOBjjrQWEO536vbPcAwRsmKirN1efb-5ECeX2AwcXrcnyEPNHzXd10JU9Mpi-PDZLJ5VYqpMyHR3l-emP6KW-bAM34qudR8xIYaEU2g1tIyL_T01uFoFJw9aVUtXPlygp_yul8YML3xHc",
  },
];

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Olivia Bennett",
    timeAgo: "2 months ago",
    rating: 5,
    comment:
      "Ethan is an amazing trainer! His personalized approach helped me achieve my fitness goals faster than I ever thought possible. Highly recommend!",
    likes: 5,
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBADtckfXoWbx2fVA7LTv9HP3JE1dnwTakQz6x0rE0KdTzP7BrBCsAOXeUW4sj_NHju0rFzZ_ibQO4Cz3nb02zbu-wN150UZum6BtccvlI8FZYfWyG78_La6RfDuAjQ0QUbKuKcAAJ4meZeI-XaIXTvU83i_vFmp2WlsVozwypJ-GdLjKoT44h_Q74Y4RFHsPwNH3NTpb6k4tm6JM0D89fkzP5le9phkR91IFTFlrxwph4vxamR1-YtUKDGDGRrg0rqoZ6wBMIxkFg",
  },
  {
    id: "2",
    name: "Noah Thompson",
    timeAgo: "3 months ago",
    rating: 5,
    comment:
      "Ethan's expertise and motivation are unmatched. He pushed me to my limits and helped me transform my body and mindset. Couldn't be happier with the results.",
    likes: 4,
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAxSC1yPaNzTnGzFJlIAmQQF7RM063XeOKfLKmErQ5mZ8v3783gfS7RD7wRhefutJZrrPcenl6VsE8tgDvcMIi4zEH9Oo2aAV3E8QDAI1C-Kb9LNTJUTLHTeHApb1BkBNaxYhBfLdBvLoJOMIOuO4h-3ZRFmZxlkIixJJl0xc1FcS1KAJFBwMgANiY05OjVKJGOhBEDqYM2MUp0R1ysX2nq5NDGm9pU-fNUaRloO2tGsF87i4z-27CBHUjSafoYnO1cFIx7fybLaJ8",
  },
];

export default function InstructorProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const router = useRouter();

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="star"
        size={20}
        color={index < rating ? "#f20d0d" : colors.secondaryText}
      />
    ));
  };

  const renderCredential = (credential: Credential) => (
    <View key={credential.id} className="flex-row items-center px-4 min-h-14">
      <View
        style={{ backgroundColor: colors.backgroundSecondary }}
        className="w-10 h-10 rounded-lg justify-center items-center mr-4"
      >
        <Icon name="school" size={24} color={colors.primaryText} />
      </View>
      <Text
        style={{ color: colors.primaryText }}
        className="text-base font-normal leading-normal flex-1"
      >
        {credential.title}
      </Text>
    </View>
  );

  const renderSuccessStory = (story: SuccessStory) => (
    <View key={story.id} className="w-60 mr-3">
      <Image
        source={{ uri: story.imageUrl }}
        className="w-full aspect-square rounded-xl mb-4"
        alt={`${story.title} success story`}
      />
      <View>
        <Text
          style={{ color: colors.primaryText }}
          className="text-base font-medium leading-normal"
        >
          {story.title}
        </Text>
        <Text
          style={{ color: colors.secondaryText }}
          className="text-sm font-normal leading-normal"
        >
          {story.description}
        </Text>
      </View>
    </View>
  );

  const renderTestimonial = (testimonial: Testimonial) => (
    <View key={testimonial.id} className="flex-col gap-3 mb-8">
      <View className="flex-row items-center gap-3">
        <Image
          source={{ uri: testimonial.avatarUrl }}
          className="w-10 h-10 rounded-full"
          alt={`${testimonial.name} profile picture`}
        />
        <View className="flex-1">
          <Text
            style={{ color: colors.primaryText }}
            className="text-base font-medium leading-normal"
          >
            {testimonial.name}
          </Text>
          <Text
            style={{ color: colors.secondaryText }}
            className="text-sm font-normal leading-normal"
          >
            {testimonial.timeAgo}
          </Text>
        </View>
      </View>
      <View className="flex-row gap-0.5">
        {renderStars(testimonial.rating)}
      </View>
      <Text
        style={{ color: colors.primaryText }}
        className="text-base font-normal leading-normal"
      >
        {testimonial.comment}
      </Text>
      <View className="flex-row gap-9">
        <TouchableOpacity className="flex-row items-center gap-2">
          <Icon name="thumb-up" size={20} color={colors.secondaryText} />
          <Text
            style={{ color: colors.secondaryText }}
            className="text-sm font-normal"
          >
            {testimonial.likes}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center gap-2">
          <Icon name="thumb-down" size={20} color={colors.secondaryText} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={{ backgroundColor: colors.backgroundPrimary }}
      className="flex-1"
    >
      <Header
        title="Instructor Profile"
        isBack={true}
        onSearchPress={() => router.push("/(tabs)/instructor/search")}
      />

      <ScrollView className="flex-1">
        <View className="p-4">
          <View className="flex-col gap-4 items-center">
            <View className="flex-col gap-4 items-center">
              <Image
                source={{
                  uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXi3Qd_RoPZ-mP8-0un3IYbe2rqcYepQnH0ZhnA4SxtXaatLBpaCqmtAO4lxgR5msYpE4FlAHvUbI_VJL3C3FHZzSogfa4LbxaoseC8g0Xpl6uQYCdBCNBExSXfnt5TG5MhTm_NAJtznyAScPWUVJOZ5Q8_24lbTEn4nQVEywv3WDDT2-g0bdMgq8zgDnn70LABAY-KYhuqrS4n4dmdQWLPEoPaM-2Un_OdVcsn5AU28xjWwwcVhm2YZrIVr8f5XM359aI7T2bPro",
                }}
                className="w-32 h-32 rounded-full"
                alt="Ethan Carter profile picture"
              />
              <View className="flex-col items-center justify-center">
                <Text
                  style={{ color: colors.primaryText }}
                  className="text-[22px] font-bold leading-tight tracking-[-0.27px] text-center"
                >
                  Ethan Carter
                </Text>
                <Text
                  style={{ color: colors.secondaryText }}
                  className="text-base font-normal leading-normal text-center"
                >
                  Certified Personal Trainer
                </Text>
                <Text
                  style={{ color: colors.secondaryText }}
                  className="text-base font-normal leading-normal text-center"
                >
                  Specializes in weightlifting, yoga, and HIIT
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={{ backgroundColor: colors.backgroundSecondary }}
              className="min-w-[84px] rounded-full h-10 px-4 justify-center items-center w-full max-w-[480px]"
            >
              <Text
                style={{ color: colors.primaryText }}
                className="text-sm font-bold leading-normal tracking-[0.27px]"
              >
                Book a Session
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text
          style={{ color: colors.primaryText }}
          className="text-[22px] font-bold leading-tight tracking-[-0.27px] px-4 pb-3 pt-5"
        >
          Credentials
        </Text>
        {credentials.map(renderCredential)}

        <Text
          style={{ color: colors.primaryText }}
          className="text-[22px] font-bold leading-tight tracking-[-0.27px] px-4 pb-3 pt-5"
        >
          Client Success Stories
        </Text>
        <View className="px-4">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="py-4"
          >
            {successStories.map(renderSuccessStory)}
          </ScrollView>
        </View>

        <Text
          style={{ color: colors.primaryText }}
          className="text-[22px] font-bold leading-tight tracking-[-0.27px] px-4 pb-3 pt-5"
        >
          Training Methodology
        </Text>
        <Text
          style={{ color: colors.primaryText }}
          className="text-base font-normal leading-normal pb-3 pt-1 px-4"
        >
          Ethans training philosophy focuses on personalized plans, combining
          strength training, flexibility, and high-intensity interval training
          to achieve optimal results. He emphasizes a holistic approach,
          incorporating nutrition and lifestyle guidance for sustainable
          fitness.
        </Text>

        <Text
          style={{ color: colors.primaryText }}
          className="text-[22px] font-bold leading-tight tracking-[-0.27px] px-4 pb-3 pt-5"
        >
          Testimonials
        </Text>
        <View className="flex-col gap-8 px-4">
          {testimonials.map(renderTestimonial)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
