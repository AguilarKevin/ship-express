import { Text, View } from "@/components/Themed";
import React from "react";
import { StyleSheet } from "react-native";

export default function DeliveryHistoryScreen() {
  return (
    <View style={styles.container}>
      <Text>Delivery History</Text>
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
