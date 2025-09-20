import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";

import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
// import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import getSessionWithProfile from "@/lib/getSessionWithProfile";
import { Providers } from "@/providers";
import { loadFonts } from "@/utils/fontLoader";
import LandingScreen from "./landing";

export default function RootLayout() {
  const [isReady, setIsReady] = useState(true);
  const [userData, setUserData] = useState<any>({
    me: null,
    session: null,
    isLoggedIn: false,
  });
  const colorScheme = useColorScheme();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Load fonts
        await loadFonts();
        await getSessionWithProfile().then((data) => {
          setUserData(data);
        });
      } catch (e) {
        console.warn("Error during app preparation:", e);
      } finally {
        // Tell the application to render
        setFontsLoaded(true);
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  if (!fontsLoaded || !isReady) {
    return <LandingScreen />;
  }

  return (
    <Providers userData={userData}>
      <GluestackUIProvider mode={colorScheme}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

            <Stack.Screen name="profile" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" options={{ headerShown: false }} />
            <Stack.Screen name="achievement" options={{ headerShown: false }} />

            <Stack.Screen name="faq" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="messages" options={{ headerShown: false }} />
            <Stack.Screen
              name="search"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="post/[postId]"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name="landing" options={{ headerShown: false }} />

            <Stack.Screen
              name="notification"
              options={{
                headerShown: false,
                presentation: "fullScreenModal",
              }}
            />
            <Stack.Screen
              name="comments/[post]"
              options={{
                headerShown: false,
                presentation: "fullScreenModal",
              }}
            />
            <Stack.Screen name="privacy" options={{ headerShown: false }} />
          </Stack>

          <StatusBar style="auto" />
        </ThemeProvider>
      </GluestackUIProvider>
    </Providers>
  );
}
