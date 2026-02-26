import { Text, View } from "@/components/Themed";
import { StyleSheet } from "react-native";

export default function HowToOrderScreen() {
  return (
    <View style={styles.container}>
      <Text>How To Order</Text>
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
