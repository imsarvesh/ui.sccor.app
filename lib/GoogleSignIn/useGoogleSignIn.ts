import useAuth from "@/service/hooks/useAuth";
import axios from "axios";
import * as Google from "expo-auth-session/providers/google";
import Constants from "expo-constants";
import React from "react";

const useGoogleSignIn = ({ onCompleted }) => {
  const { onSuccess, onFailure, setLoading, isLoading } = useAuth({
    onCompleted,
  });
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    redirectUri: Constants.expoConfig?.scheme
      ? `${Constants.expoConfig.scheme}://`
      : undefined,
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      setLoading(true);
      const { params } = response;
      if (params) {
        axios
          .post(`${process.env.EXPO_PUBLIC_API}/auth/google/ios`, {
            idToken: params.id_token,
          })
          .then(onSuccess)
          .catch(onFailure);
      }
    }
  }, [response]);

  return {
    promptAsync,
    request,
    response,
    isLoading,
  };
};

export default useGoogleSignIn;
