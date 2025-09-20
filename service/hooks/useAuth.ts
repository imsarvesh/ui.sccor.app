import config from "@/constants/configs";
import getSessionWithProfile from "@/lib/getSessionWithProfile";
import { useDispatch, useStore } from "@/providers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios, { AxiosError } from "axios";
import { useCallback, useState } from "react";

const BACKEND = process.env.EXPO_PUBLIC_API;

const getAPI = () => ({
  login: async (payload) => {
    try {
      return Axios.post(`${BACKEND}/auth/signin`, payload);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  logout: async (accessToken) => {
    try {
      return Axios.post(
        `${BACKEND}/auth/signout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
});

type AuthProps = {
  onCompleted?: (user: any) => void;
  onError?: (error: AxiosError) => void;
};

const useAuth = ({ onCompleted, onError }: AuthProps) => {
  const dispatch = useDispatch();
  const { session } = useStore();

  const API = getAPI();

  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(session));

  const [isLoading, setLoading] = useState(false);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await API.logout(session?.accessToken).then(async () => {
        dispatch({ type: "loggedOut" });
        setIsAuthenticated(false);
        await AsyncStorage.removeItem(config.SESSION_KEY);
      });
    } catch (error) {
      console.error("Logout error:", error);
      throw new Error("Loggout failed");
    } finally {
      setLoading(false);
    }
  }, [session]);

  const onSuccess = useCallback(async ({ data }) => {
    if (data) {
      console.log("onSuccess", data);
      await AsyncStorage.setItem(config.SESSION_KEY, JSON.stringify(data));
      const sessionWithProfile = await getSessionWithProfile(data);
      await new Promise((resolve) => {
        dispatch({ type: "loggedIn", payload: sessionWithProfile });
        setTimeout(() => {
          resolve(true);
        }, 100);
      });
      setIsAuthenticated(true);
      onCompleted?.(data);
      setLoading(false);
      return data;
    }
  }, []);

  const onFailure = useCallback((error) => {
    setLoading(false);
    console.error(error);
    onError?.(error);
  }, []);

  return {
    logout,
    isLoading,
    isAuthenticated,
    setLoading,
    session,
    onSuccess,
    onFailure,
  };
};

export default useAuth;
