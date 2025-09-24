// create a higher order component that checks if the user is logged in

import { useStore } from "@/providers/StoreProvider/useStore";
import { Redirect } from "expo-router";

export default function withLogin(Component: React.ComponentType) {
  return function WithLogin(props: any) {
    const { isLoggedIn } = useStore();
    if (!isLoggedIn) {
      return <Redirect href="/login" />;
    }
    return <Component {...props} />;
  };
}
