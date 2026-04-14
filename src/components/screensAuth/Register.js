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
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { registerUser } from "../services/API";
import { useTheme } from "react-native-paper";
import { useColorScheme } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  // Age verification states
  const [ageVerified, setAgeVerified] = useState(false);
  const [isUnderAge, setIsUnderAge] = useState(false);
  const [parentEmail, setParentEmail] = useState("");
  const [parentConsent, setParentConsent] = useState(false);

  const handleAgeChange = (text) => {
    const numeric = text.replace(/[^0-9]/g, "");
    setAge(numeric);
    setAgeVerified(false);
    setIsUnderAge(false);
    setParentEmail("");
    setParentConsent(false);
  };

  const handleVerifyAge = () => {
    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 1 || ageNum > 150) {
      Alert.alert("Invalid Age", "Please enter a valid age.");
      return;
    }
    setAgeVerified(true);
    setIsUnderAge(ageNum < 18);
  };

  const handleRegister = async () => {
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

    if (!ageVerified) {
      Alert.alert("Error", "Please verify your age first");
      return;
    }

    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 1 || ageNum > 150) {
      Alert.alert("Error", "Please enter a valid age");
      return;
    }

    if (isUnderAge) {
      if (!parentEmail.trim()) {
        Alert.alert("Error", "Please provide a parent/guardian email");
        return;
      }
      if (!parentConsent) {
        Alert.alert(
          "Error",
          "Please confirm you have permission from your parent/guardian",
        );
        return;
      }
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
        ...(isUnderAge && { parentEmail: parentEmail.trim().toLowerCase() }),
      });

      await AsyncStorage.setItem("user", JSON.stringify(result.user));
      navigation.navigate("InterestList");
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
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Image
            source={
              colorScheme === "dark"
                ? require("../images/logoNT.png")
                : require("../images/logoNT_navy.png")
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

          <View style={styles.ageRow}>
            <View style={styles.ageInputWrapper}>
              <TextInput
                style={styles.ageInput}
                placeholder="Age"
                placeholderTextColor={"#999"}
                value={age}
                onChangeText={handleAgeChange}
                keyboardType="number-pad"
                maxLength={3}
                editable={!loading}
              />
            </View>

            {age.length > 0 && (
              <TouchableOpacity
                style={[styles.verifyBtn, ageVerified && styles.verifiedBtn]}
                onPress={handleVerifyAge}
                disabled={loading}
              >
                {ageVerified ? (
                  <FontAwesome name="check-circle" size={22} color="#22a861" />
                ) : (
                  <Text style={styles.verifyText}>Verify</Text>
                )}
              </TouchableOpacity>
            )}
          </View>

          {ageVerified && isUnderAge && (
            <View style={styles.consentBox}>
              <View style={styles.consentHeader}>
                <FontAwesome
                  name="exclamation-circle"
                  size={18}
                  color="#b45309"
                />
                <Text style={styles.consentTitle}>
                  {" "}
                  Parental consent required
                </Text>
              </View>
              <Text style={styles.consentDesc}>
                As you're under 18, we need your parent/guardian's approval
                before you can apply to opportunities.
              </Text>

              <Text style={styles.parentLabel}>Parent/Guardian Email *</Text>
              <View style={styles.parentEmailWrapper}>
                <TextInput
                  style={styles.parentEmailInput}
                  placeholder="parent@example.com"
                  placeholderTextColor={"#999"}
                  value={parentEmail}
                  onChangeText={setParentEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={!loading}
                />
              </View>

              <TouchableOpacity
                style={styles.checkboxRow}
                onPress={() => setParentConsent(!parentConsent)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.checkbox,
                    parentConsent && styles.checkboxChecked,
                  ]}
                >
                  {parentConsent && (
                    <FontAwesome name="check" size={12} color="#fff" />
                  )}
                </View>
                <Text style={styles.checkboxLabel}>
                  I confirm that I have permission from my parent/guardian to
                  register and that the email provided is correct.
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Create Account</Text>
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
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const makeStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scroll: {
      flex: 1,
    },
    content: {
      padding: 20,
      paddingTop: 60,
      paddingBottom: 40,
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
    fieldLabel: {
      fontSize: 14,
      fontWeight: "500",
      color: theme.colors.onBackground,
      marginBottom: 6,
    },
    ageRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 15,
      gap: 10,
    },
    ageInputWrapper: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme.colors.onBackground,
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 15,
    },
    ageInput: {
      flex: 1,
      fontSize: 16,
      color: theme.colors.onBackground,
    },
    verifyBtn: {
      backgroundColor: "#2b8df0",
      paddingHorizontal: 18,
      paddingVertical: 13,
      borderRadius: 10,
    },
    verifiedBtn: {
      backgroundColor: "#e6faf1",
      borderWidth: 1,
      borderColor: "#22a861",
    },
    verifyText: {
      color: "#fff",
      fontWeight: "600",
      fontSize: 15,
    },
    consentBox: {
      backgroundColor: "#fefce8",
      borderRadius: 10,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: "#fde68a",
    },
    consentHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 6,
    },
    consentTitle: {
      fontWeight: "700",
      color: "#92400e",
      fontSize: 15,
    },
    consentDesc: {
      color: "#92400e",
      fontSize: 14,
      marginBottom: 14,
      lineHeight: 20,
    },
    parentLabel: {
      fontSize: 14,
      fontWeight: "500",
      color: theme.colors.onSecondary,
      marginBottom: 6,
    },
    parentEmailWrapper: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#d1d5db",
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 6,
      backgroundColor: "#fff",
      marginBottom: 14,
    },
    emailIcon: {
      marginRight: 10,
    },
    parentEmailInput: {
      flex: 1,
      fontSize: 15,
      color: "#333",
    },
    checkboxRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 10,
    },
    checkbox: {
      width: 20,
      height: 20,
      borderRadius: 4,
      borderWidth: 2,
      borderColor: "#555",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 2,
      flexShrink: 0,
    },
    checkboxChecked: {
      backgroundColor: "#333",
      borderColor: "#333",
    },
    checkboxLabel: {
      flex: 1,
      fontSize: 14,
      color: "#333",
      lineHeight: 20,
      fontWeight: "500",
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
