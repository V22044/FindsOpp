import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "react-native-paper";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useCurrentUser } from "../../context/useCurrentUser";
import { updateUser } from "../services/API";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

const INTEREST_LABELS = {
  environment: "Environment",
  education: "Education",
  animal_welfare: "Animal Welfare",
  community: "Community",
  health: "Health",
};

export const Profile = ({ navigation, onLogout }) => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const { user, reloadUser } = useCurrentUser();
  const DEV_MODE = true;

  const [isEditing, setIsEditing] = useState(false);
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [interests, setInterests] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        try {
          const str = await AsyncStorage.getItem("user");
          if (str) {
            const u = JSON.parse(str);
            setInterests(u.interestList ?? []);
          }
        } catch (e) {
          console.error("Profile load error:", e);
        }
      };
      load();
    }, []),
  );

  const handleEditPress = () => {
    setEditEmail(user?.email || "");
    setEditPassword("");
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditEmail("");
    setEditPassword("");
    setConfirmPassword("");
  };

  const handleSaveChanges = async () => {
    if (!editEmail.trim()) {
      Alert.alert("Validation", "Email cannot be empty.");
      return;
    }
    if (editPassword.trim() && editPassword !== confirmPassword) {
      Alert.alert("Validation", "Passwords do not match.");
      return;
    }
    try {
      setSaving(true);
      const updates = { email: editEmail };
      if (editPassword.trim()) updates.password = editPassword;

      await updateUser(user.email, updates);

      const updatedUser = { ...user, email: editEmail };
      await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
      await reloadUser();

      Alert.alert("Success", "Profile updated successfully.");
      setIsEditing(false);
      setEditPassword("");
      setConfirmPassword("");
    } catch (err) {
      Alert.alert("Error", "Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleEditInterests = () => {
    const parentNav = navigation.getParent();
    (parentNav ?? navigation).navigate("EditInterests", {
      isEditing: true,
      currentInterests: interests,
    });
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem("user");
          onLogout();
        },
      },
    ]);
  };

  const handleDevBypass = async () => {
    const u = await AsyncStorage.getItem("user");
    console.log("DEV: logged in user:", JSON.parse(u));
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardRow}>
          {user?.profileImage ? (
            <Image source={{ uri: user.profileImage }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarFallback}>
              <FontAwesome
                name="user"
                size={36}
                color={theme.colors.onSurfaceVariant}
              />
            </View>
          )}
          <View style={styles.info}>
            <Text style={styles.name}>
              {user?.firstName} {user?.lastName}
            </Text>
            <Text style={styles.email}>{user?.email}</Text>
            {user?.age != null && (
              <Text style={styles.age}>{user.age} years old</Text>
            )}
          </View>
        </View>

        <View style={styles.divider} />

        {isEditing ? (
          <View style={styles.editForm}>
            <Text style={styles.fieldLabel}>Email</Text>
            <TextInput
              style={styles.input}
              value={editEmail}
              onChangeText={setEditEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={"#999"}
            />

            <Text style={styles.fieldLabel}>New Password</Text>
            <TextInput
              style={styles.input}
              value={editPassword}
              onChangeText={setEditPassword}
              secureTextEntry
              placeholder="Leave blank to keep current"
              placeholderTextColor={"#999"}
            />

            <Text style={styles.fieldLabel}>Confirm New Password</Text>
            <TextInput
              style={[
                styles.input,
                confirmPassword &&
                  editPassword !== confirmPassword &&
                  styles.inputError,
              ]}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              placeholder="Re-enter new password"
              placeholderTextColor={"#999"}
            />
            {confirmPassword && editPassword !== confirmPassword && (
              <Text style={styles.errorText}>Passwords do not match</Text>
            )}

            <View style={styles.editActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancel}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveChanges}
                disabled={saving}
              >
                {saving ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.saveButtonText}>Save Changes</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
            <FontAwesome
              name="pencil"
              size={14}
              color={theme.colors.onPrimary}
            />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={[styles.card, { marginTop: 16 }]}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>My Interests</Text>
          <TouchableOpacity onPress={handleEditInterests}>
            <Text style={styles.editBtn}>Edit</Text>
          </TouchableOpacity>
        </View>

        {interests.length === 0 ? (
          <Text style={styles.noInterests}>No interests selected yet.</Text>
        ) : (
          <View style={styles.pillRow}>
            {interests.map((id) => (
              <View key={id} style={styles.pill}>
                <Text style={styles.pillText}>{INTEREST_LABELS[id] ?? id}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

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

const makeStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      alignItems: "center",
      paddingTop: 80,
      paddingHorizontal: 20,
    },
    card: {
      width: "100%",
      backgroundColor: theme.colors.primary,
      borderRadius: 16,
      padding: 20,
      borderWidth: 4,
      borderColor: theme.colors.onBackground,
    },
    cardRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
    },
    avatar: {
      width: 72,
      height: 72,
      borderRadius: 36,
    },
    avatarFallback: {
      width: 72,
      height: 72,
      borderRadius: 36,
      backgroundColor: theme.colors.surfaceVariant,
      justifyContent: "center",
      alignItems: "center",
    },
    info: {
      flex: 1,
      gap: 2,
    },
    name: {
      fontSize: 18,
      fontWeight: "700",
      color: theme.colors.onPrimary,
    },
    email: {
      fontSize: 13,
      color: theme.colors.onPrimary,
      marginTop: 2,
    },
    age: {
      fontSize: 13,
      color: theme.colors.onPrimary,
      marginTop: 2,
    },
    divider: {
      height: 2,
      backgroundColor: theme.colors.outlineVariant,
      marginVertical: 16,
    },
    editButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      paddingVertical: 12,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: theme.colors.outlineVariant,
    },
    editButtonText: {
      fontSize: 15,
      fontWeight: "500",
      color: theme.colors.onPrimary,
    },
    editForm: {
      gap: 6,
    },
    fieldLabel: {
      fontSize: 13,
      fontWeight: "600",
      color: theme.colors.onPrimary,
      marginBottom: 2,
      marginTop: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.outlineVariant,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 15,
      color: theme.colors.onSurface,
      backgroundColor: theme.colors.background,
    },
    inputError: {
      borderColor: "#ff3b30",
    },
    errorText: {
      fontSize: 12,
      color: "#ff3b30",
      marginTop: 2,
    },
    editActions: {
      flexDirection: "row",
      gap: 10,
      marginTop: 16,
    },
    cancelButton: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.colors.outlineVariant,
      alignItems: "center",
    },
    cancelButtonText: {
      fontSize: 15,
      fontWeight: "500",
      color: theme.colors.onPrimary,
    },
    saveButton: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 10,
      backgroundColor: theme.colors.primaryContainer,
      alignItems: "center",
    },
    saveButtonText: {
      fontSize: 15,
      fontWeight: "600",
      color: theme.colors.onPrimaryContainer,
    },
    cardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: theme.colors.onPrimary,
    },
    editBtn: {
      fontSize: 14,
      color: theme.colors.onPrimary,
      fontWeight: "600",
      textDecorationLine: "underline",
    },
    noInterests: {
      fontSize: 14,
      color: theme.colors.onPrimary,
      opacity: 0.7,
    },
    pillRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },
    pill: {
      backgroundColor: theme.colors.primaryContainer,
      borderRadius: 20,
      paddingHorizontal: 12,
      paddingVertical: 6,
    },
    pillText: {
      color: theme.colors.onPrimaryContainer,
      fontSize: 13,
      fontWeight: "500",
    },
    logoutButton: {
      marginTop: 16,
      width: "100%",
      backgroundColor: "#ff3b30",
      paddingVertical: 14,
      borderRadius: 10,
      alignItems: "center",
    },
    logoutButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
    },
    devButton: {
      marginTop: 12,
      width: "100%",
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
  });

export default Profile;
