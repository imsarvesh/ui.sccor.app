import config from "@/constants/configs";
import getMyProfile from "@/service/query/getMyProfile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isEmpty } from "lodash";
import apolloClient from "../lib/apolloClient";
const BACKEND_URL = process.env.EXPO_PUBLIC_API;

const getProfileData = () => {};

const getSessionWithProfile = async (data?: string) => {
  let session =
    data ||
    (await AsyncStorage.getItem(config.SESSION_KEY).then((data) =>
      JSON.parse(data)
    ));
  console.log("session", session);
  if (!session) return { session: null, me: null, isLoggedIn: false };
  session = await refreshToken(session.refreshToken);

  if (!session) return { session: null, me: null, isLoggedIn: false };

  const profile = await apolloClient(session?.accessToken)
    .query({ query: getMyProfile })
    .then(({ data }: any) => {
      return data?.profile;
    })
    .catch((error) => {
      console.error("GraphQL Error", error);
      return {};
    });

  return { session, me: profile, isLoggedIn: !isEmpty(profile) };
};

export default getSessionWithProfile;

export const refreshToken = async (oldRefreshToken: string) => {
  try {
    await AsyncStorage.removeItem(config.SESSION_KEY);
    const response = await fetch(`${BACKEND_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: oldRefreshToken,
      }),
    });

    if (!response.ok) {
      return null;
    }

    const session = await response.json();
    const { accessToken, refreshToken } = session;
    if (accessToken && refreshToken) {
      console.log("refreshToken", session);
      await AsyncStorage.setItem(config.SESSION_KEY, JSON.stringify(session));
      return session;
    }
    return null;
  } catch (err) {
    console.error("Refresh Token failed:", err);
    return null;
  }
};
