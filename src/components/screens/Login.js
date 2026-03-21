import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser } from "../services/API";
import { useTheme } from "react-native-paper";
import { useColorScheme } from "react-native";

const Login = ({ navigation, onLogin }) => {
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const styles = makeStyles(theme);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // DEV_MODE
  const DEV_MODE = true;
  const handleDevBypass = () => {
    onLogin();
  };

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const result = await loginUser({
        email: email.trim().toLowerCase(),
        password,
      });

      // Save user data locally
      await AsyncStorage.setItem("user", JSON.stringify(result.user));

      Alert.alert("Success", "Login successful!");

      // Navigate to home or main app screen
      onLogin();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      Alert.alert("Login Failed", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.content}>
          <Image
            source={
              colorScheme === "dark"
                ? require("../images/logoNT.png") // Dark mode logo
                : require("../images/logoNT_navy.png") // Light mode logo
            }
            style={styles.Image}
            resizeMode="contain"
          />
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Login to continue</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            editable={!loading}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            editable={!loading}
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            disabled={loading}
          >
            <Text style={styles.linkText}>
              Don't have an account?{" "}
              <Text style={styles.linkBold}>Sign Up</Text>
            </Text>
          </TouchableOpacity>

          {/* DEV Mode Button */}
          {DEV_MODE && (
            <TouchableOpacity
              style={styles.devButton}
              onPress={handleDevBypass}
            >
              <Text style={styles.devButtonText}>DEV: Skip Login</Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
const makeStyles = (theme) =>
  StyleSheet.create({
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
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      padding: 20,
      justifyContent: "center",
    },
    Image: {
      alignSelf: "center",
      width: 120,
      height: 120,
      marginBottom: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      marginBottom: 8,
      color: theme.colors.onBackground,
      alignSelf: "center",
    },
    subtitle: {
      fontSize: 16,
      color: theme.colors.onBackground,
      marginBottom: 50,
      alignSelf: "center",
    },
    input: {
      backgroundColor: "transparent",
      padding: 15,
      borderRadius: 10,
      marginBottom: 15,
      color: theme.colors.onBackground,
      fontSize: 16,
      borderWidth: 1,
      borderColor: theme.colors.onBackground,
    },
    button: {
      backgroundColor: theme.colors.primary,
      padding: 16,
      borderRadius: 10,
      alignItems: "center",
      marginTop: 10,
      marginBottom: 30,
    },
    buttonDisabled: {
      opacity: 0.6,
    },
    buttonText: {
      color: theme.colors.onPrimary,
      fontSize: 16,
      fontWeight: "600",
    },
    linkText: {
      color: theme.colors.onBackground,
      textAlign: "center",
      fontSize: 14,
      marginBottom: 50,
    },
    linkBold: {
      color: "#2b8df0",
      fontWeight: "600",
    },
  });

export default Login;
