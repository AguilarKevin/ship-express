import { Pressable, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function TabProfileScreen() {
  return (
    <View style={styles.container}>
      <Text
        style={{
          ...styles.title,
          alignSelf: "center"
        }}
      >
        Ship Express
      </Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <View
        style={{
          flex: 0
        }}
      >
        <Text>Kevin Aguilar</Text>
        <Text>Casillero: KA-897112</Text>
      </View>
      <View style={styles.sectionContainer}>
        <Link href="/(tabs)/profile/edit">
          <Pressable
            style={styles.linkOptionPressable}
            onPress={() => {
              // Handle edit profile action
            }}
          >
            <FontAwesome
              size={22}
              style={{ marginBlockEnd: 4 }}
              name="user-o"
            />

            <Text>Mi Perfil</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingInline: 20,
    paddingBlock: 40
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%"
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: "darkgray",
    width: "100%",
    borderRadius: 8
  },
  linkOptionPressable: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62
  }
});
