import { Text, View } from "@/components/Themed";
import { StyleSheet } from "react-native";

export default function PackageHistoryScreen() {
  return (
    <View style={styles.container}>
      <Text>Package History</Text>
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
