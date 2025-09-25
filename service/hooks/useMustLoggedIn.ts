import { useStore } from "@/providers";
import { router } from "expo-router";

const useMustLoggedIn = (callback: any) => {
  const { isLoggedIn } = useStore();
  return (...args: any) => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    } else {
      return callback(...args);
    }
  };
};

export default useMustLoggedIn;
