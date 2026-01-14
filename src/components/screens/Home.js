import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export const Home = () => {
  return (
    <View style={styles.container}>
      <Text>This is the Home screen.</Text>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
