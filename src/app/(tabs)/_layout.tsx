import React from "react";

import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import { useTheme } from "tamagui";

export default function TabLayout() {
  const theme = useTheme();

  return (
    <NativeTabs
      iconColor={{
        default: theme.colorMuted?.val ?? theme.color.val,
        selected: theme.accent1.val
      }}
    >
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon sf="cube" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="notifications">
        <Label>Notifications</Label>
        <Icon sf="bell" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <Label>Profile</Label>
        <Icon sf="person" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
