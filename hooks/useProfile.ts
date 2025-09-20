import { useDispatch, useStore } from "@/providers";
import FOLLOW from "@/service/mutation/follow";
import UNFOLLOW from "@/service/mutation/unfollow";

import GET_FOLLOWERS_BY_USERNAME from "@/service/query/getFollowersByUsername";
import GET_FOLLOWING_BY_USERNAME from "@/service/query/getFollowingByUsername";
import GET_MY_PROFILE from "@/service/query/getMyProfile";
import GET_PROFILE_BY_USERNAME from "@/service/query/getProfileByUsername";

import { OtherProfile } from "@/graphql/types/graphql";
import { useMutation, useQuery } from "@apollo/client/react";
import { useEffect, useRef, useState } from "react";

export const useMyProfile = () => {
  const { me } = useStore();
  const dispatch = useDispatch();

  const { loading: isLoading, data: profile } = useQuery(GET_MY_PROFILE, {
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    dispatch({
      type: "updateMyProfile",
      payload: profile,
    });
  }, [profile, dispatch]);

  return {
    isLoading,
    profile: me,
  };
};

export const useUnFollow = ({ onCompleted, ...options }) => {
  const [mutation, response] = useMutation(UNFOLLOW);

  const unfollow = ({ id, followersCount, ...rest }: OtherProfile) =>
    mutation({
      variables: {
        otherUserId: id,
      },
      onCompleted,
      ...options,
    });

  return { unfollow, response };
};

export const useFollow = ({ onCompleted, ...options }) => {
  const [mutation, response] = useMutation(FOLLOW);

  const follow = ({ id, followersCount, ...rest }: OtherProfile) => {
    return mutation({
      variables: {
        otherUserId: id,
      },
      onCompleted,
      onError: () => {
        onCompleted({ id, followersCount, ...rest });
      },
      ...options,
    });
  };

  return { follow, response };
};

const useProfile = (username: string) => {
  const dispatch = useDispatch();

  const { loading: isLoading, data } = useQuery(GET_PROFILE_BY_USERNAME, {
    fetchPolicy: "no-cache",
    variables: {
      username,
    },
  });

  const profile = (data as any)?.profile as OtherProfile;

  useEffect(() => {
    if (profile) {
      dispatch({
        type: "updateUserProfile",
        payload: profile,
      });
    }
  }, [profile, dispatch]);

  return {
    isLoading,
    profile,
  };
};

export const useFollowersList = ({ username }) => {
  const [profiles, setProfiles] = useState([]);
  const nextTokenRef = useRef<string>("");
  const { loading: isLoading, data: followers } = useQuery(
    GET_FOLLOWERS_BY_USERNAME,
    {
      fetchPolicy: "no-cache",
      variables: { username },
    }
  );

  useEffect(() => {
    if (followers) {
      const { profiles, nextToken } = followers as {
        profiles: OtherProfile[];
        nextToken: string;
      };
      nextTokenRef.current = nextToken;
      setProfiles(profiles || []);
    }
  }, [followers]);

  return {
    isLoading,
    profiles,
  };
};

export const useFollowingList = ({ username }) => {
  console.log(username);
  const [profiles, setProfiles] = useState([]);
  const nextTokenRef = useRef<string>("");
  const { loading: isLoading, data: following } = useQuery(
    GET_FOLLOWING_BY_USERNAME,
    {
      fetchPolicy: "no-cache",
      variables: { username },
    }
  );

  useEffect(() => {
    if (following) {
      const { profiles, nextToken } = following as {
        profiles: OtherProfile[];
        nextToken: string;
      };
      nextTokenRef.current = nextToken;
      setProfiles(profiles || []);
    }
  }, [following]);

  return {
    isLoading,
    profiles,
  };
};

export default useProfile;
