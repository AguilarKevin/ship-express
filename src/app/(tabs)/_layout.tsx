import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";

import { useColorScheme } from "@/components/useColorScheme";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";

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
    <NativeTabs
    // screenOptions={{
    //   tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
    //   // Disable the static render of the header on web
    //   // to prevent a hydration error in React Navigation v6.
    //   headerShown: useClientOnlyValue(false, true)
    // }}
    >
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon sf="cube" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="notifications">
        <Label>Notifications</Label>
        <Icon sf="bell" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile/index">
        <Label>Profile</Label>
        <Icon sf="person" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
