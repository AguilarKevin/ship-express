import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { containerStyles } from "@/constants/Styles";

export default function TabNotificationsScreen() {
  return (
    <View
      style={{
        ...containerStyles.styles
      }}
    >
      <Text style={styles.title}>No Notifications</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
