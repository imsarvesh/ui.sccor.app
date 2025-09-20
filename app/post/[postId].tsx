import { CommentList, Header, PostItem } from "@/components";
import { Reply } from "@/graphql/types/graphql";
import React, { useState } from "react";
import { SafeAreaView } from "../../components/ui";

const mockComments: Reply[] = [
  {
    id: "1",
    user: {
      name: "Alex",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB-tMIL9GAM79sIKjiLX1XU4-yUZMxDb-QUKCboVg4dCoYLv-Oklz4HGUosZQoWrlnp9rVislq8Qb4iYcDDFB1ra_-J3RkCvzsplPK-008SDsaMXImBHaSZIOt3PWq5rP4fjO_1rmif8O2lZtBeupyz2ApKHZWWcRMBXePW5VxtP3C0aerWg0bnX0lQB-rj5kNa4jkDTlum1eR92jwgrrZ5GzkoJmOyPqzCVtL_CwgR-dmJgahFDPyx9NCmTFmjPse7_5Fu-k25Y2A",
    },
    text: "This is an incredible achievement! Your dedication and hard work truly paid off. Congratulations on this well-deserved success!",
    timestamp: "2d",
    likes: 12,
  },
  {
    id: "2",
    user: {
      name: "Sophia",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAMKKPmUJXaSxPf9d3ri7av8DnCn7KKwtyd1vkY427R1X-WVuQm7JsJaMmwAfSA1dC7LGyXqNYKRekgBcFegNIGnH-hgRxQwsd5h2tMh3MTL67neFa9s4HKw-B8JiOEhQ_yGSvM4calBZmn9us9mRPsqQpyazhyYhDlcjn5zzi5Th2cejuH9FGQPWRLFDW-UMsdN6zV9UYEm5RwyFEaH-LpZeNoDu_NOT-tPvb8DbvweLehwzI1lJNI7n7TbVT7V7dXe8JiaC1pHYo",
    },
    text: "Absolutely amazing! You're an inspiration to us all. Keep pushing boundaries and achieving greatness!",
    timestamp: "1d",
    likes: 8,
  },
  {
    id: "3",
    user: {
      name: "Ethan",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAkcu5qf7rW8IAfd4Rl861l5thXhO_AulsvpVYiPlMi-4SKE0O5Kap87MV7Yc29raI4aI8lR5blkh90E1SmhYYLGpN5Ugt24tLPCEauxAxFmKIPlAOyJfHDL5-V9Bh3fKpP1xkGS46ncSYW88eYKKOdGtDIaCNhzBe-Pi0G8kNWopv0fJhRSi6VBKIKilAjt_WEKTxjhj1whWc5jDcuZVx0VH3Wc4xiUVGAEGxg13We1RcZQ1rGmwV8eUomnWYsCHznAq_bExoMwZQ",
    },
    text: "Such a remarkable performance! Your perseverance and skill are truly commendable. Wishing you even more success in your future endeavors.",
    timestamp: "1d",
    likes: 15,
  },
  {
    id: "4",
    user: {
      name: "Olivia",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBTniJ_-tDy7qWeQPyDBT6afCyNq1Zvd84jL1OlDfustVNMYqQ_nZgSa3ssKUmlCKiKAP3Zd9CfqnmpcX51FLrlEtg39eyYnTIfJ1paeLzOyy0ArJ4qyw1UziW13tF_lvgDFDFWu7QKDwrJ0-5RoKNe6dGMGi-q_8V-jQi-813D8DFPbiPKTQpDSSrf_2eb8FuPNbujnS9OwRjTz6mAplFXvMt3b7k-YkukQeTQVgmCnojwI16ldraaUcSIkcIi9Y6CHheiyYK3Vd0",
    },
    text: "This is beyond impressive! Your passion and commitment shine through in every move. Congratulations on this outstanding accomplishment!",
    timestamp: "12h",
    likes: 20,
  },
  {
    id: 5,
    user: {
      name: "Liam",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBpkNVMz-WKQyTs2EK3fy9Y5rEFEnYeSpjUHG_5KCmiRkNlhXCtB04g6kQPwRRMeojtJtAbF3mKCkwmy8dzjdKbm74wR4sTDBOHwwhQmxIis_6QWlf02Xl9z3NzKetoTtOwY2nJxugVze7eQlYI1S9oKds9PdUoMakpesECoM88-KZMz4_ceZaYT_LzTpXE7-UT4XOu8U_MUjFc4MDYS1mEdvjhm_3WimgKv6hcSWUwIqaeeekc5t6pailawCFfY93KF9sGZvLofDY",
    },
    text: "Incredible work! Your talent and determination are truly inspiring. Keep up the fantastic work and continue to reach for the stars!",
    timestamp: "10h",
    likes: 10,
  },
];

const Post = () => {
  const post = {
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
  };

  const [comments, setComments] = useState<Reply[]>(mockComments);

  const handleLikeComment = (commentId: number) => {
    setComments(
      comments.map((comment: any) =>
        comment.id === commentId
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      )
    );
  };

  return (
    <SafeAreaView className="flex-1">
      <Header title="Post" isBack={true} isSearch={false} />
      <PostItem post={post} />
      {/* Comments List */}
      <CommentList comments={comments} onLikeComment={handleLikeComment} />
    </SafeAreaView>
  );
};

export default Post;
