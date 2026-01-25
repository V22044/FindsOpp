import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Bookmark } from "lucide-react-native";

export const Saved = () => {
  return (
    <View style={styles.container}>
      <Bookmark size="80" color="#bdbdbd" strokeWidth="1.25px" />
      <Text style={styles.text}>No Saved Opportunities Yet!</Text>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 150,
  },
  text: {
    fontSize: 17,
    fontWeight: "15",
    marginTop: 17,
    color: "#bdbdbd",
  },
});

export default Saved;
