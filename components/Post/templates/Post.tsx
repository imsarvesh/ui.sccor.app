import React from "react";
import { Image, Text } from "react-native";

import { useStore } from "@/providers/PostProvider";

import { HStack, VStack } from "@/components/ui";
import LinkifiedText from "@/components/LinkifiedText";
import timeAgo from "@/service/utils/timeAgo";

const Post = () => {
  const post = useStore();
  const user = post.profile;

  return (
    <HStack className="mb-3">
      <Image
        source={{
          uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlXu1dn4IN38F65vzxPDTG45ftnXxhmNpkjdJSd_OjElyCTdFyyhW_7kQcpLe2XZ7i65VUOibkr1HQCeNPDGzo12L3p6Avszg41u81mA9sfV_Hhpb-dhUmVvpmADtfqwHakrC68RrwqZeuB3xNE_QnY_N7CgN1tE4LNX0Rhd8k6Nk_CSCHesEEt7zk--jMb2kgzw_1DrHGAuLUhagKHI0AlANGok4hxLgznmDTvS0FEEYsq2-KUUi7ygUIgEbSy-vkES97bEx2QDU",
        }}
        alt="User profile picture"
        className="w-14 h-14 rounded-full mr-4"
      />
      <VStack className="flex-1">
        <Text className="text-base font-medium text-typography-black dark:text-typography-white">
          {user.name}
        </Text>
        <Text className="text-sm font-normal text-typography-gray dark:text-typography-gray mt-0.5">
          {timeAgo(new Date(+post.createdAt))}
        </Text>
        <LinkifiedText
          text={post.text}
          className="pt-3 text-base font-normal text-typography-black dark:text-typography-white leading-6 mb-3"
          onHashtagPress={(hashtag) => {
            // Handle hashtag press - you can navigate to hashtag page or search
            console.log("Hashtag pressed:", hashtag);
          }}
          onUrlPress={(url) => {
            // Handle URL press - opens in browser by default
            console.log("URL pressed:", url);
          }}
        />
      </VStack>
    </HStack>
  );
};

export default Post;
