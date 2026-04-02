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
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { registerUser } from "../services/API";
import { useTheme } from "react-native-paper";
import { useColorScheme } from "react-native";

const Register = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const theme = useTheme();
  const styles = makeStyles(theme);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    // Validation
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !age ||
      !email.trim() ||
      !password
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 1 || ageNum > 150) {
      Alert.alert("Error", "Please enter a valid age");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const result = await registerUser({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        age: ageNum,
        email: email.trim().toLowerCase(),
        password,
      });

      Alert.alert("Success!", "Account created successfully. Please login.", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Login"),
        },
      ]);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      Alert.alert("Registration Failed", errorMessage);
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
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>

          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            placeholderTextColor={"#999"}
            onChangeText={setFirstName}
            autoCapitalize="words"
            editable={!loading}
          />

          <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor={"#999"}
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize="words"
            editable={!loading}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={"#999"}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            editable={!loading}
          />

          <TextInput
            style={styles.input}
            placeholder="Password (min 6 characters)"
            placeholderTextColor={"#999"}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            editable={!loading}
          />

          <TextInput
            style={styles.input}
            placeholder="Age"
            placeholderTextColor={"#999"}
            value={age}
            onChangeText={setAge}
            keyboardType="number-pad"
            maxLength={3}
            editable={!loading}
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Register</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            disabled={loading}
          >
            <Text style={styles.linkText}>
              Already have an account?{" "}
              <Text style={styles.linkBold}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
const makeStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f5f5f5",
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
      color: theme.colors.onBackground,
      borderRadius: 10,
      marginBottom: 15,
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

export default Register;
