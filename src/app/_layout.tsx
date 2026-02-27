import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import { supabase } from "@/lib/supabase";
import { config } from "@/tamagui.config";
import { TamaguiProvider } from "tamagui";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)"
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

async function checkAuthSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) return false;

  const session = data.session;
  if (!session?.access_token || !session.user) return false;

  if (!session.expires_at) return true;
  return session.expires_at * 1000 > Date.now();
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font
  });
  const [authReady, setAuthReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const colorScheme = useColorScheme();
  const router = useRouter();
  const segments = useSegments();

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    const runAuthCheck = async () => {
      const hasSession = await checkAuthSession();
      setIsAuthenticated(hasSession);
      setAuthReady(true);
    };

    runAuthCheck();

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const hasSession = Boolean(session?.access_token && session.user);
      setIsAuthenticated(hasSession);
      setAuthReady(true);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!loaded || !authReady) return;

    const inAuthGroup = segments[0] === "auth";

    if (!isAuthenticated && !inAuthGroup) {
      router.replace("/auth/login");
      return;
    }

    if (isAuthenticated && inAuthGroup) {
      router.replace("/");
    }
  }, [authReady, isAuthenticated, loaded, router, segments]);

  useEffect(() => {
    if (loaded && authReady) {
      SplashScreen.hideAsync();
    }
  }, [authReady, loaded]);

  if (!loaded || !authReady) {
    return null;
  }

  return (
    <TamaguiProvider config={config} defaultTheme={colorScheme ?? "light"}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false, headerTitle: "" }}
        />
        <Stack.Screen
          name="(modals)/contact-info"
          options={{ presentation: "pageSheet", headerShown: true }}
        />

        <Stack.Screen
          name="auth/login"
          options={{
            headerShown: false
          }}
        />
      </Stack>
    </TamaguiProvider>
  );
}
