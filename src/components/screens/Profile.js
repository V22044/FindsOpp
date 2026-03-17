import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Profile = ({ onLogout }) => {
  const DEV_MODE = true;
  const handleDevBypass = async () => {
    const user = await AsyncStorage.getItem("user");
    console.log("DEV: logged in user:", JSON.parse(user));
  };
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
      {DEV_MODE && (
        <TouchableOpacity style={styles.devButton} onPress={handleDevBypass}>
          <Text style={styles.devButtonText}>DEV: test</Text>
        </TouchableOpacity>
      )}

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  devButton: {
    marginTop: 20,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ff6600",
    alignItems: "center",
  },
  devButtonText: {
    color: "#ff6600",
    fontSize: 14,
    fontWeight: "600",
  },
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
