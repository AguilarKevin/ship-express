import { StyleSheet } from "react-native";

import { SafeAreaView, Text, View } from "@/components/Themed";

export default function TabOneScreen() {
  return (
    <SafeAreaView>
      <View>
        <Text style={styles.title}>No packages</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%"
  }
});
