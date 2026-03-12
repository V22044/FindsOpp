import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Profile = ({ onLogout }) => {
  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: async () => {
          await AsyncStorage.removeItem("user");
          if (onLogout) {
            onLogout();
          }
        },
        style: "destructive",
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <Text>This is the profile screen.</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

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
  logoutButton: {
    backgroundColor: "#ff3b30",
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Profile;
