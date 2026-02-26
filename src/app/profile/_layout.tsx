import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="/profile/edit" options={{ title: "Edit Profile" }} />
      <Stack.Screen
        name="delivery-history"
        options={{ title: "Delivery History" }}
      />
    </Stack>
  );
}
