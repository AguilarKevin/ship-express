import { Text, View } from "@/components/Themed";
import React from "react";
import { StyleSheet } from "react-native";

export default function AddressesScreen() {
  return (
    <View style={styles.container}>
      <Text>My Addresses</Text>
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
