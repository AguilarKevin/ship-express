import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import React from "react";

import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={22} style={{ marginBlockEnd: 4 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true)
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          header: () => null,
          tabBarIcon: ({ color }) => <TabBarIcon name="cube" color={color} />,
          title: "Packages"
        }}
      />

      <Tabs.Screen
        name="notifications"
        options={{
          header: () => null,
          tabBarIcon: ({ color }) => <TabBarIcon name="bell" color={color} />,
          title: "Notifications"
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          header: () => null,
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          title: "Profile"
        }}
      />
    </Tabs>
  );
}
