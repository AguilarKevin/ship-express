import { Text, View } from "@/components/Themed";
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

export default function ProfileEditScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Update Profile Info" }} />
      <Text>Profile Edit</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  }
});
