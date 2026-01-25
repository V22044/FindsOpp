import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export const Profile = () => {
  return (
    <View style={styles.container}>
      <Text>This is the profile screen.</Text>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Profile;
